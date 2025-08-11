// import { Suspense } from "react";
// import SigninForm from "./SigninForm";

// export default function SignInPage() {
//   return (
//     <Suspense
//       fallback={
//         <div className="h-screen bg-[var(--background)] flex items-center justify-center bg-[url('/images/puja44.png')] bg-cover bg-center bg-no-repeat">
//           <span className="text-white text-xl font-semibold">Loading...</span>
//         </div>
//       }
//     >
//       <SigninForm />
//     </Suspense>
//   );
// }

"use client";
import { useParams } from "next/navigation";
import SigninForm from "../SigninForm";

export default function SigninPage() {
  const { role } = useParams();
  return <SigninForm role={role} />;
}

