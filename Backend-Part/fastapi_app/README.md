# Lightweight FastAPI + Static Frontend

Quick start (PowerShell):

1. Create and activate a virtual environment

```powershell
cd "e:\Python_Project\Awesome_LLM_Learnig_Guide\Backend-Part\fastapi_app"
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

2. Run the backend (FastAPI)

```powershell
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

3. Serve the frontend (separate terminal)

```powershell
cd "e:\Python_Project\Awesome_LLM_Learnig_Guide\Backend-Part\fastapi_app\static"
python -m http.server 5500
```

Open `http://localhost:5500` in your browser. The frontend calls `http://localhost:8000/api/*`.

Notes:
- CORS is enabled in `main.py` to allow the static frontend to call the API.
- The backend uses in-memory storage; restart clears data.
