import { useStore } from "../app/store";

export default function AnnouncementBar() {
  const { state, selectors } = useStore();
  const msg =
    selectors.remaining > 0
      ? `${state.promo.announcement}. Add RM${selectors.remaining.toFixed(2)} more to qualify.`
      : `${state.promo.announcement}. You qualify now.`;

  return <div className="announcementBar">{msg}</div>;
}
