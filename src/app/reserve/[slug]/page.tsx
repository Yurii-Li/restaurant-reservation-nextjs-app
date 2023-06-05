import { ReserveForm, ReserveHeader } from "@/app/reserve/[slug]/components";

export const metadata = {
  title: "Reserve at Milestones Grill (Toronto) | OpenTable",
};

export default function Reserve() {
  return (
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto">
        <ReserveHeader />
        <ReserveForm />
      </div>
    </div>
  );
}
