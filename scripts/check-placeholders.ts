import { home } from "../content/home";
import { collectPlaceholders, placeholderGuard } from "../lib/placeholder";

const result = placeholderGuard(process.env.VERCEL_ENV, collectPlaceholders(home));
console.log(result.message);
if (!result.ok) process.exit(1);
