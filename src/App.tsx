import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SiteLayout, DemoProvider } from "./heritage/shared";
import Home from "./heritage/Home";
const Public = lazy(() => import("./heritage/Public"));
const Admissions = lazy(() => import("./heritage/Admissions"));
const Portal = lazy(() => import("./heritage/Portal"));
export default function App() {
  return (
    <BrowserRouter>
      <DemoProvider>
        <SiteLayout>
          <Suspense
            fallback={
              <div className="page loading" role="status">
                Opening your next chapter…
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admissions/*" element={<Admissions />} />
              <Route path="/visit" element={<Admissions />} />
              <Route path="/portal/*" element={<Portal />} />
              <Route path="*" element={<Public />} />
            </Routes>
          </Suspense>
        </SiteLayout>
      </DemoProvider>
    </BrowserRouter>
  );
}
