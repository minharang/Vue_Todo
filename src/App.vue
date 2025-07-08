<script>
</script>

<template>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
<body>
    <div class="container">
        <header class="header">
            <div class="logo">LOGO</div>
            <nav class="main-nav">
                <ul>
                    <li><a href="#">홈</a></li>
                    <li><a href="#">SR관리</a></li>
                    <li><a href="#">통계관리</a></li>
                    <li><a href="#">사용자관리</a></li>
                </ul>
            </nav>
            <div class="header-right">
                <span class="material-icons">dark_mode</span>
                <a href="#">로그아웃</a>
            </div>
        </header>

        <aside class="sidebar">
            <nav>
                <ul>
                    <li><a href="#">홈</a></li>
                    <li><a href="#" class="active">SR관리</a></li>
                    <li><a href="#">통계관리</a></li>
                    <li><a href="#">사용자관리</a></li>
                </ul>
            </nav>
        </aside>

        <main class="main-content">
            <section class="card workload-time">
                <h2>업무 공수시간</h2>
                <div class="progress-circle-container">
                    <div class="progress-circle">
                        <div class="progress-percent">50%</div>
                    </div>
                </div>
                <div class="workload-details">
                    <p class="placeholder-line"></p>
                    <p class="placeholder-line"></p>
                </div>
            </section>

            <section class="card todo-list">
                <div class="todo-header">
                    <h2>TODO 리스트</h2>
                    <button class="add-button">추가</button>
                </div>
                <div class="todo-tabs">
                    <button class="tab-button active">전체보기</button>
                    <button class="tab-button">진행중</button>
                    <button class="tab-button">보류</button>
                    <button class="tab-button">미완료</button>
                    <button class="tab-button">완료</button>
                </div>
                <div class="todo-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>상태</th>
                                <th>요약</th>
                                <th>완료일</th>
                                <th>완료율</th>
                                <th>공수시간</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="status-indicator completed"></td>
                                <td>
                                    <div class="todo-summary">
                                        <div class="status-text">● 완료</div>
                                        <div>첫 번째 작업</div>
                                        <div class="sub-text">SR-004</div>
                                    </div>
                                </td>
                                <td>
                                    <div>2024-24</div>
                                    <div>2024-25</div>
                                </td>
                                <td>6.0h</td>
                                <td>6.0h/7h</td>
                            </tr>
                            <tr>
                                <td class="status-indicator in-progress"></td>
                                <td>
                                    <div class="todo-summary">
                                        <div class="status-text">진행중</div>
                                        <div>두 번째 작업</div>
                                        <div class="sub-text">SR-003</div>
                                    </div>
                                </td>
                                <td>
                                    <div>2024-24</div>
                                    <div>2024-25</div>
                                </td>
                                <td>3.0/-</td>
                                <td>3.0h/-</td>
                            </tr>
                            <tr>
                                <td class="status-indicator on-hold"></td>
                                <td>
                                    <div class="todo-summary">
                                        <div class="status-text">▲ 보류</div>
                                        <div>세 번째 작업</div>
                                        <div class="sub-text">SR-002</div>
                                    </div>
                                </td>
                                <td>
                                    <div>2024-22</div>
                                    <div>2024-22</div>
                                </td>
                                <td>-/-</td>
                                <td>-/-</td>
                            </tr>
                            <tr>
                                <td class="status-indicator pending"></td>
                                <td>
                                    <div class="todo-summary">
                                        <div class="status-text">미완료</div>
                                        <div>네 번째 작업</div>
                                        <div class="sub-text">SR-001</div>
                                    </div>
                                </td>
                                <td>
                                    <div>2024-24</div>
                                    <div>2024-21</div>
                                </td>
                                <td>-/2.5h</td>
                                <td>2.5h</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    </div>
</body>
</html>
</template>

<style scoped>
/* General Resets and Base Styles */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f0f2f5;
    color: #333;
    line-height: 1.6;
}

a {
    text-decoration: none;
    color: inherit;
}

ul {
    list-style: none;
}

button {
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
    font-size: inherit;
    color: inherit;
}

/* Layout Container */
.container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

/* Header */
.header {
    background-color: #2c3e50;
    color: #ecf0f1;
    padding: 15px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
}

.header .logo {
    font-weight: bold;
    font-size: 24px;
    margin-right: 30px;
    flex-shrink: 0; /* Prevent logo from shrinking */
}

.header .main-nav ul {
    display: flex;
    gap: 25px;
    flex-wrap: wrap; /* Allow nav items to wrap */
    justify-content: center; /* Center items if wrapped */
}

.header .main-nav a {
    padding: 5px 0;
    position: relative;
    font-weight: 500;
}

.header .main-nav a::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 0;
    height: 2px;
    background-color: #3498db;
    transition: width 0.3s ease-in-out;
}

.header .main-nav a:hover::after,
.header .main-nav a.active::after {
    width: 100%;
}

.header-right {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-shrink: 0; /* Prevent right section from shrinking */
}

.header-right .material-icons {
    font-size: 24px;
    cursor: pointer;
}

/* Main Content Area */
.main-content {
    display: flex;
    flex: 1; /* Allows it to grow and take remaining space */
    padding: 20px;
    gap: 20px;
    margin-left: 200px; /* Space for the sidebar */
    transition: margin-left 0.3s ease;
    flex-wrap: wrap; /* Allow cards to wrap on smaller screens */
    align-items: flex-start; /* Align items to the top */
}

/* Sidebar */
.sidebar {
    background-color: #ffffff;
    width: 200px;
    padding: 20px 0;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
    position: fixed;
    top: 70px; /* Height of the header (adjust if header height changes) */
    left: 0;
    bottom: 0;
    z-index: 999;
    overflow-y: auto; /* Enable scrolling if sidebar content is long */
}

.sidebar ul li {
    margin-bottom: 10px;
}

.sidebar ul li a {
    display: block;
    padding: 12px 20px;
    color: #555;
    font-weight: 500;
    transition: background-color 0.3s, color 0.3s;
}

.sidebar ul li a:hover,
.sidebar ul li a.active {
    background-color: #e6f7ff;
    color: #3498db;
    border-left: 4px solid #3498db;
}

/* Card Styles */
.card {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    padding: 25px;
    flex-grow: 1; /* Allow cards to grow */
    flex-shrink: 1; /* Allow cards to shrink */
    min-width: 280px; /* Minimum width for cards before wrapping */
}

/* Workload Time Card */
.workload-time {
    flex-basis: 30%; /* Approximately 30% of main-content width */
    max-width: 400px; /* Max width to prevent it from getting too wide */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    text-align: center;
}

.workload-time h2 {
    font-size: 1.3em;
    color: #444;
    margin-bottom: 15px;
}

.progress-circle-container {
    width: 150px;
    height: 150px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.progress-circle {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2em;
    font-weight: bold;
    color: #3498db;
    background: conic-gradient(#3498db 180deg, #e0e0e0 0deg); /* 50% = 180deg */
    position: relative;
    overflow: hidden;
}

.progress-circle::before {
    content: '';
    position: absolute;
    width: calc(100% - 20px); /* Inner circle to create the ring effect */
    height: calc(100% - 20px);
    background-color: #ffffff;
    border-radius: 50%;
    z-index: 1;
}

.progress-percent {
    position: relative;
    z-index: 2;
}

.workload-details {
    width: 100%;
    margin-top: 10px;
}

.placeholder-line {
    background-color: #eee;
    height: 15px;
    width: 80%;
    margin: 8px auto;
    border-radius: 4px;
}


/* TODO List Card */
.todo-list {
    flex-basis: 65%; /* Approximately 65% of main-content width */
    min-width: 400px; /* Minimum width for this card */
    display: flex;
    flex-direction: column;
}

.todo-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap; /* Allow header items to wrap */
    gap: 10px; /* Space between wrapped items */
}

.todo-header h2 {
    font-size: 1.3em;
    color: #444;
}

.add-button {
    background-color: #3498db;
    color: #fff;
    padding: 8px 15px;
    border-radius: 5px;
    font-weight: 500;
    transition: background-color 0.2s;
}

.add-button:hover {
    background-color: #2980b9;
}

.todo-tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
    justify-content: flex-start; /* Align tabs to start */
}

.todo-tabs .tab-button {
    padding: 8px 15px;
    border-radius: 5px;
    border: 1px solid #ddd;
    color: #666;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s;
    flex-shrink: 0; /* Prevent tabs from shrinking too much */
}

.todo-tabs .tab-button.active {
    background-color: #3498db;
    color: #fff;
    border-color: #3498db;
}

.todo-tabs .tab-button:hover:not(.active) {
    background-color: #f0f0f0;
    border-color: #bbb;
}

.todo-table-container {
    overflow-x: auto; /* Allows horizontal scrolling for the table if it overflows */
    flex-grow: 1; /* Allow table container to grow */
}

.todo-list table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px; /* Ensure table doesn't get too squished, enables scroll */
}

.todo-list th,
.todo-list td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
    white-space: nowrap; /* Prevent text wrapping in cells by default */
}

.todo-list thead th {
    background-color: #f8f8f8;
    color: #777;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.9em;
}

.todo-list tbody tr:hover {
    background-color: #f9f9f9;
}

.status-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
}

.status-indicator.completed {
    background-color: #27ae60; /* Green */
}

.status-indicator.in-progress {
    background-color: #3498db; /* Blue */
}

.status-indicator.on-hold {
    background-color: #f39c12; /* Orange */
}

.status-indicator.pending {
    background-color: #e74c3c; /* Red */
}

.todo-summary {
    display: flex;
    flex-direction: column;
    gap: 3px;
}

.todo-summary .status-text {
    font-weight: bold;
    font-size: 0.85em;
    color: #555;
}

.todo-summary .sub-text {
    font-size: 0.8em;
    color: #999;
}

/* ========================================================= */
/* Responsive Adjustments using Media Queries                */
/* ========================================================= */

/* Tablet & Smaller Desktop Screens (e.g., 992px to 768px) */
@media (max-width: 992px) {
    .header {
        padding: 10px 15px;
    }

    .header .main-nav ul {
        gap: 15px;
    }

    .main-content {
        margin-left: 0; /* Remove sidebar margin for main content */
        flex-direction: column; /* Stack cards vertically */
        align-items: center; /* Center cards when stacked */
        padding: 15px;
    }

    .sidebar {
        width: 100%;
        height: auto;
        position: static; /* Make sidebar static flow with content */
        box-shadow: none;
        border-bottom: 1px solid #eee;
        padding: 10px 0;
        top: auto;
        bottom: auto;
    }

    .sidebar ul {
        display: flex;
        justify-content: center; /* Center nav items */
        flex-wrap: wrap; /* Allow sidebar nav items to wrap */
        gap: 5px; /* Adjust gap for smaller screens */
    }

    .sidebar ul li {
        margin-bottom: 0;
    }

    .sidebar ul li a {
        padding: 10px 15px;
        border-left: none; /* Remove left border for horizontal tabs */
        border-bottom: 2px solid transparent; /* Add bottom border for active state */
    }

    .sidebar ul li a:hover,
    .sidebar ul li a.active {
        border-left: none;
        border-bottom: 2px solid #3498db;
        background-color: #e6f7ff;
    }

    .workload-time,
    .todo-list {
        flex-basis: 100%; /* Take full width when stacked */
        max-width: 100%; /* Ensure they don't exceed parent width */
        min-width: unset; /* Remove min-width constraints */
        width: 100%;
    }

    .todo-tabs {
        justify-content: center; /* Center tabs when they wrap */
    }
}

/* Smaller Tablets & Large Mobile Devices (e.g., 768px to 480px) */
@media (max-width: 768px) {
    .header {
        flex-direction: column; /* Stack header items vertically */
        align-items: flex-start;
        gap: 10px;
        padding: 10px;
    }

    .header .main-nav {
        width: 100%; /* Make nav take full width */
    }
    .header .main-nav ul {
        justify-content: space-around; /* Distribute nav items evenly */
        gap: 10px; /* Smaller gap */
    }

    .header .logo {
        margin-bottom: 10px;
        width: 100%; /* Logo takes full width if needed */
        text-align: center;
    }

    .header-right {
        width: 100%;
        justify-content: center; /* Center logout/dark mode */
        margin-top: 10px;
    }

    .todo-header {
        flex-direction: column; /* Stack todo header items */
        align-items: stretch; /* Stretch to fill width */
        gap: 15px;
    }

    .todo-tabs {
        flex-direction: column; /* Stack tabs vertically */
        align-items: stretch; /* Stretch tabs to fill width */
    }

    .todo-tabs .tab-button {
        width: 100%; /* Full width buttons */
        text-align: center;
    }

    .todo-list table {
        min-width: 500px; /* Maintain minimum width, rely on overflow-x */
    }
}

/* Mobile Devices (e.g., 480px and below) */
@media (max-width: 480px) {
    body {
        font-size: 14px; /* Slightly smaller base font size */
    }

    .main-content {
        padding: 10px;
        gap: 15px;
    }

    .card {
        padding: 15px;
    }

    .workload-time h2,
    .todo-list h2 {
        font-size: 1.1em;
    }

    .progress-circle-container {
        width: 120px; /* Smaller progress circle */
        height: 120px;
    }

    .progress-circle {
        font-size: 1.6em;
    }

    .progress-circle::before {
        width: calc(100% - 16px);
        height: calc(100% - 16px);
    }

    .add-button {
        padding: 7px 12px;
        font-size: 0.9em;
    }

    .todo-list th,
    .todo-list td {
        padding: 8px 10px;
        font-size: 0.85em;
    }

    .todo-list table {
        min-width: 450px; /* Even smaller min-width for very small screens */
    }

    /* Adjust specific table columns if needed, e.g., hide some on small screens */
   /* .todo-list thead th:nth-child(4), .todo-list tbody td:nth-child(4) {
        /* display: none; */ /* Uncomment to hide this column on very small screens 
    }*/
}
</style>