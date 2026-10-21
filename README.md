# Employee CRUD (React + Vite + Axios)

Backend: http://backend.jitendra.sbs

## Run
```bash
npm install
npm run dev
```
Browser me http://localhost:5173 kholo.

## Production build
```bash
npm run build
```

## Config
- Base URL `.env` me hai: `VITE_API_BASE_URL=http://backend.jitendra.sbs`
- Employee fields `src/config/fields.js` me hain (name, email, department, designation, salary).
  Backend ke fields alag hon to sirf wahi file edit karo.
- Saare axios calls: `src/api/employeeApi.js`

## Endpoints used
| Action | Method | URL |
|---|---|---|
| Create | POST | /api/employees |
| List (+filter) | GET | /api/employees?department=IT |
| Get one | GET | /api/employees/{id} |
| Update | PUT | /api/employees/{id} |
| Delete | DELETE | /api/employees/{id} |

## Note
Backend par CORS enable hona chahiye (origin `http://localhost:5173` allowed).
Agar frontend https par deploy karoge to backend bhi https hona chahiye (mixed content block hota hai).
