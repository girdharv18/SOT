function Step({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col gap-[5px] bg-[hsl(0,0%,89%)] border border-[hsl(0,0%,80%)] p-[20px] rounded-2xl">
      <h2 className="font-medium text-[#3C4753] text-[20px]">{title}</h2>
      <p className="text-[#727A8B]">{description}</p>
    </div>
  );
}

export default function HowDoesItWork() {
  return (
    <div className="mt-[30px] px-[20px] rounded-2xl">
      <div className="text-center">
        <h1 className="text-3xl font-bold">How Does It Work?</h1>
        <p className="text-[#4F5B64] mb-[40px]">
          Simple steps to get started with MindCurePath
        </p>
      </div>

      <div className="flex items-start max-w-[800px] mx-auto justify-center gap-[30px]">
        <div className="hidden [@media(min-width:840px)]:flex items-center self-center justify-center flex-1">
          <img
            src="images/how-does-it-work/how_does_it_work.png"
            alt="How Does it Work?"
            className="w-[330px] rounded-2xl"
          />
        </div>

        <div className="flex flex-1 [@media(max-width:839px)]:w-full flex-col gap-[10px]">
          <Step
            title="1. Get to the form / WhatsApp"
            description="Fill out the form or contact us on WhatsApp to proceed. Get quick assistance instantly!"
          />
          <Step
            title="2. Book your appointment"
            description="Schedule your appointment now to get timely assistance from our team!"
          />
          <Step
            title="3. You'll be contacted at your booked time."
            description="Our team will reach out to you at your scheduled time for further assistance. Stay tuned!"
          />
          <Step
            title="4. Free Follow-ups as needed"
            description="Get free follow-ups whenever you need for continued support!"
          />
        </div>
      </div>
    </div>
  );
}
