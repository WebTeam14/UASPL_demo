import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import societyRoutes from "./routes/society.routes";
import civilChecklistRoutes from "./routes/civilChecklist.routes";
import projectRoutes from "./routes/project.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import tenderRoutes from "./routes/tender.routes";
import bidderRoutes from "./routes/bidder.routes";
import evaluationRoutes from "./routes/evaluation.routes";
import alertRoutes from "./routes/alert.routes";
import progressRoutes from "./routes/progress.routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

app.use(express.json());

/* ROUTES */

app.use("/api/auth", authRoutes);
app.use("/api/societies", societyRoutes);
app.use("/api/civil-checklists", civilChecklistRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tenders", tenderRoutes);
app.use("/api/bidders", bidderRoutes);
app.use("/api/evaluation", evaluationRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/progress", progressRoutes);

/* HEALTH CHECK */

app.get("/health", (_req, res) => {
  res.json({
    status: "OK",
    message: "Backend running",
  });
});

export default app;