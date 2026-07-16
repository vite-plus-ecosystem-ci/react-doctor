// rule: media-has-caption
// weakness: test-gating
// source: PR #1304

import { vi } from "vite-plus/test";

vi.mock("react-player", () => ({
  default: () => <video src="/fixture.mp4" />,
}));
