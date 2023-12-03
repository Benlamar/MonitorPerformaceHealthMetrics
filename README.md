# MonitorPerformaceHealthMetrics
This application uses React Js for the web application, Express JS and MongoDB for the backend and a Python client that
simulate the as a device to monitor health data. This conntion is done in real time using Socket.io

## Getting Started
Follow these steps to get the application up and running on your local machine.

### Prerequisites
Make sure you have Node.js, Python3, MongoDB and npm installed on your machine.
Change the mongodb url if require in the .env file. I using localhost.

### Installation and Running the application
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/MonitorPerformaceHealthMetrics.git
    ```
2. Navigate to the project directory and do the following for React application:
    ```bash
    cd MonitorPerformaceHealthMetrics/webapp
    ```

     ```bash
    npm install
    ```

     ```bash
    npm run dev
    ```

3. Navigate to the project directory and do the following for Express application:
    ```bash
    cd MonitorPerformaceHealthMetrics/server
    ```

     ```bash
    npm install
    ```

     ```bash
    npm start
    ```

4. Install Python3 (I am using 3.10) and install the following packages:
    [note: use pip3/python3 for Linux/Ubuntu ]

    ```bash
    pip install socketio
    ```

     ```bash
    cd MonitorPerformaceHealthMetrics
    ```

     ```bash
    python simulation2.py
    ```

### Acknowledgments
You can copy and paste this template into your README.md file on GitHub and replace the placeholders with your actual application details.
