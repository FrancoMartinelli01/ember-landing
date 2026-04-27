const WhatsAppFab = () => {
  return (
    <a
      href="https://wa.me/5491XXXXXXXXX"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consultanos por WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(37,211,102,0.6)]"
    >
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor" aria-hidden>
        <path d="M20.52 3.48A11.88 11.88 0 0012.06 0C5.5 0 .18 5.32.18 11.88c0 2.09.55 4.13 1.6 5.93L0 24l6.34-1.66a11.86 11.86 0 005.72 1.46h.01c6.55 0 11.88-5.33 11.88-11.88a11.81 11.81 0 00-3.43-8.44zM12.07 21.3h-.01a9.4 9.4 0 01-4.79-1.31l-.34-.2-3.76.98 1-3.66-.22-.37a9.42 9.42 0 01-1.45-5.06c0-5.21 4.24-9.45 9.45-9.45 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 012.77 6.68c0 5.21-4.24 9.45-9.45 9.45zm5.18-7.07c-.28-.14-1.68-.83-1.94-.93-.26-.1-.45-.14-.64.14-.19.28-.74.93-.9 1.12-.17.19-.33.21-.61.07-.28-.14-1.2-.44-2.28-1.4-.84-.75-1.41-1.68-1.58-1.96-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.5.14-.17.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.49.07-.74.35-.26.28-.97.95-.97 2.32 0 1.37 1 2.7 1.14 2.88.14.19 1.96 3 4.75 4.21.66.29 1.18.46 1.58.59.66.21 1.27.18 1.74.11.53-.08 1.68-.69 1.92-1.35.24-.66.24-1.23.17-1.35-.07-.12-.26-.19-.54-.33z"/>
      </svg>
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-bg-secondary border border-border-subtle px-3 py-1.5 text-xs font-body text-foreground opacity-0 translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">
        Consultanos por WhatsApp
      </span>
    </a>
  );
};

export default WhatsAppFab;
