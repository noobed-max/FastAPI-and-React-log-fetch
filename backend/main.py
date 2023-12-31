from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import re



app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # This allows all origins, you can specify your frontend URL instead
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
LOG_FILE_PATH = '{path to access.log)'


@app.get("/logs")
def get_access_logs():
    try:
        with open(LOG_FILE_PATH, "r") as file:
            access_logs = file.readlines()

        result = []
        for log in access_logs:
            # Extract IP address and date-time from log entries
            ip_address = re.search(r'^([\d.]+)', log)
            date_time = re.search(r'\[([^:]+:[^\]]+)\]', log)

            if ip_address and date_time:
                result.append({
                    "ip_address": ip_address.group(1),
                    "date_time": date_time.group(1)
                })

        return JSONResponse(content=result)

    except FileNotFoundError:
        return JSONResponse(content={"error": "Access log file not found"}, status_code=404)
