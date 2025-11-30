interface CalendarWidgetProps {
  className?: string;
}

export default function CalendarWidget({ className = "" }: CalendarWidgetProps) {
  return (
    <div className={className}>
      <a
        href="https://link.opkie.com/widget/bookings/strategy-meeting30"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-gradient-to-r from-[#2C5F7C] to-[#1e4459] hover:from-[#1e4459] hover:to-[#2C5F7C] text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
      >
        Schedule Your Free Strategy Call
      </a>
    </div>
  );
}
