/* Tailwind Play CDN config — mirrors design tokens from styles.css / plan.md §1.
   Loaded synchronously right after the CDN script so utilities resolve to brand tokens. */
tailwind.config = {
  theme: {
    container: { center: true, padding: "1rem", screens: { xl: "1280px" } },
    screens: { sm: "480px", md: "768px", lg: "1024px", xl: "1440px" },
    extend: {
      colors: {
        primary: { DEFAULT: "#00a8a9", 600: "#018a8b", 700: "#007577" },
        inkteal: "#053b3f",
        amber: { DEFAULT: "#fbaf5d", 600: "#f59423" },
        brandorange: "#f5762d",
        ink: "#14201f",
        body: "#44514f",
        muted: "#7c8a88",
        line: "#e4ebea",
        soft: "#f5f8f8",
        success: "#1f9d57",
        warning: "#e6a700",
        danger: "#d64545",
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      borderRadius: { sm: "8px", md: "12px", lg: "16px", xl: "24px" },
      maxWidth: { container: "1280px" },
      boxShadow: {
        card: "0 4px 16px rgba(5,59,63,.08)",
        hover: "0 12px 28px rgba(5,59,63,.14)",
      },
    },
  },
};
