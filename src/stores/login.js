import { defineStore } from 'pinia';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; 

const loadUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return null;
    
    try {
        return JSON.parse(storedUser);
    } catch (e) {
        console.error('Local Storage에서 사용자 정보 로드 실패:', e);
        // 파싱 실패 시 초기화
        localStorage.removeItem('user');
        return null;
    }
};

export const useLoginStore = defineStore('login', {
    state: () => {
        const user = loadUserFromLocalStorage();
        
        return {
            user: user, 
            isAuthenticated: !!(user && user.USER_ID), 
            isLoadingUser: false,
            loginError:null,
        };
    },
    actions: {
        async fetchCurrentUser() {
            this.isLoadingUser = true; 
            this.loginError = null;
            try {
                const response = await axios.get(`${API_BASE_URL}/api/com/getCurrentUser`, { withCredentials: true }); 
                
                this.user = response.data;
                
                localStorage.setItem('user', JSON.stringify(response.data));
                this.isAuthenticated = !!response.data.USER_ID; 

                console.log('User info loaded:', this.user);

            } catch (err) {
               if (err.response && err.response.status === 401) {
                    console.log('세션 정보 없음: 로그아웃 상태');
                    localStorage.removeItem('user');
                } else {
                    console.error('사용자 정보 로딩 실패:', err);
                    localStorage.removeItem('user');
                }
                this.user = null;
                this.isAuthenticated = false;
            } finally {
                this.isLoadingUser = false;
            } 
        },
        async loginUser({ userId, password }) {
            this.loginError = null;
            try {
                const response = await axios.post(`${API_BASE_URL}/auth/login`, {
                    userId,
                    password
                }, {
                    withCredentials: true
                });
                if (response.status === 200 && response.data.success) {
                    console.log(`${response.data.userId}님, 로그인 성공! (Store 처리)`);
                    await this.fetchCurrentUser();
                    return { success: true, message: response.data.message };
                } else {
                   throw new Error('로그인 응답 실패');
                }

            } catch (err) {
                console.error('Login API 호출 실패:', err.response ? err.response.data : err.message);
                
                const message = err.response && err.response.data && err.response.data.message 
                                ? err.response.data.message 
                                : '로그인 중 알 수 없는 오류가 발생했습니다.';
                throw new Error(message); 
            } 
        },
        async logoutUser() {
            try{

                await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
                    withCredentials: true
                });
                
                this.user = null;
                this.isAuthenticated = false;
                this.loginError = null;
                localStorage.removeItem('user');

            }catch(err) {
                console.error('로그아웃 실패:', err);
                this.user = null;
                this.isAuthenticated = false;
                this.loginError = null;
                localStorage.removeItem('user');
            }
            
        },
    },
    getters: {
        g_userId: (state) => state.user ? state.user.USER_ID : 'Guest',
        g_userName: (state) => state.user ? state.user.USER_NAME : 'Guest',
    },
});
