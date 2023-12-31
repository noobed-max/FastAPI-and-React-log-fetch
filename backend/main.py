from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import re
import json

with open('config.json') as config_file:
    config = json.load(config_file)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # This allows all origins, you can specify your frontend URL instead
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
LOG_FILE_PATH = config['fastapi']['log_file_path']

MONTH_MAP = {
    "Jan": "1",
    "Feb": "2",
    "Mar": "3",
    "Apr": "4",
    "May": "5",
    "Jun": "6",
    "Jul": "7",
    "Aug": "8",
    "Sep": "9",
    "Oct": "10",
    "Nov": "11",
    "Dec": "12",
}


@app.get("/logs")
def get_access_logs():
    try:
        with open(LOG_FILE_PATH, "r") as file:
            access_logs = file.readlines()

        result = []
        for log in access_logs:
            # Extract IP address, date, and time from log entries
            ip_address = re.search(r'^([\d.]+)', log)
            date_time = re.search(r'\[([^:]+):([^\]]+)\s[+\-\d]+\]', log)  # Updated regex

            if ip_address and date_time:
                date = date_time.group(1)
                time = date_time.group(2)

                # Add 05:30 to the time
                time_obj = datetime.strptime(time, '%H:%M:%S')
                time_obj += timedelta(hours=5, minutes=30)
                time = time_obj.strftime('%H:%M:%S')

                # Update date format
                day, month, year = date.split('/')
                month = MONTH_MAP[month]
                updated_date = f"{day}/{month}/{year}"

                result.append({
                    "ip_address": ip_address.group(1),
                    "date": updated_date,
                    "time": time
                })

        return JSONResponse(content=result)


    except FileNotFoundError:
        return JSONResponse(content={"error": "Access log file not found"}, status_code=404)
