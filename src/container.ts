import "server-only";
import { join } from "node:path";
import { GetLandingPage } from "@/modules/landing/application/GetLandingPage";
import { JsonFileLandingPageRepository } from "@/modules/landing/infrastructure/JsonFileLandingPageRepository";
import { JoinWaitlist } from "@/modules/waitlist/application/JoinWaitlist";
import { JsonFileSubscriberRepository } from "@/modules/waitlist/infrastructure/JsonFileSubscriberRepository";
import { SystemClock } from "@/shared/infrastructure/SystemClock";

/**
 * Composition root: the only place that knows the concrete implementations.
 * Switching storage means changing a line here, not the domain.
 */
// Versioned content (shipped with the image) is kept apart from data written at runtime.
const contentDir = process.env.CONTENT_DIR ?? join(process.cwd(), "content");
const dataDir = process.env.DATA_DIR ?? join(process.cwd(), "data");

export const container = {
  getLandingPage: new GetLandingPage(
    new JsonFileLandingPageRepository(contentDir),
  ),
  joinWaitlist: new JoinWaitlist(
    new JsonFileSubscriberRepository(join(dataDir, "subscribers.json")),
    new SystemClock(),
  ),
};
