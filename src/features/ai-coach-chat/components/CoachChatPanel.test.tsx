import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CoachChatPanel } from "@/features/ai-coach-chat/components/CoachChatPanel";

describe("CoachChatPanel", () => {
  it("traps focus within the composer and restores on unmount", async () => {
    const user = userEvent.setup();
    const trigger = document.createElement("button");
    trigger.textContent = "Open coach";
    document.body.append(trigger);
    trigger.focus();

    const { unmount } = render(
      <CoachChatPanel
        messages={[]}
        isLoading={false}
        isStreaming={false}
        streamingText=""
        liveAnnouncement=""
        errorMessage={null}
        onSend={async () => undefined}
        onCancel={() => undefined}
      />,
    );

    const textarea = screen.getByLabelText("Message your AI coach");
    await user.click(textarea);
    await user.type(textarea, "Need recovery advice");

    await user.tab();
    expect(screen.getByRole("button", { name: "Send" })).toHaveFocus();

    await user.tab();
    expect(textarea).toHaveFocus();

    unmount();
    expect(trigger).toHaveFocus();
  });
});
