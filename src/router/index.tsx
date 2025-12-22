import React, { Suspense } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import PageLoding from "../components/PageLoding";
import MainLayout from "../Layout/MainLayout";
import DeputyLayout from "../Layout/DeputyLayout";

const Home = React.lazy(() => import("../view/home"));
// const Friends = React.lazy(() => import("../view/friends"));
const Account = React.lazy(() => import("../view/account/Account"));
const AccountInvite = React.lazy(() => import("../view/account/invite"));
const Detail = React.lazy(() => import("../view/detail"));
const Ranking = React.lazy(() => import("../view/ranking"));
const Advanced = React.lazy(() => import("../view/advanced"));
const CreateCoin = React.lazy(() => import("../view/createCoin"));
const Support = React.lazy(() => import("../view/support"));
const Bridge = React.lazy(() => import("../view/bridge"));

export default function Router() {
  return (
    <Suspense fallback={<PageLoding></PageLoding>}>
      <Routes>
        <Route path="/*" element={<MainLayout />}>
          {/* <Route path=":address/">
            <Route index element={<IDO />}></Route>
            <Route path="IDO" element={<IDO />}></Route>
          </Route> */}

          <Route path="" element={<Home />}></Route> 
          <Route path="detail" element={<Detail />}></Route> 
          {/* <Route path="friends" element={<Friends />}></Route> */} 
          <Route path="account" element={<Account />}></Route>
          <Route path="account/invite" element={<AccountInvite />}></Route> 
          <Route path="ranking" element={<Ranking />}></Route> 
          <Route path="advanced" element={<Advanced />}></Route> 
          <Route path="createCoin" element={<CreateCoin />}></Route> 
          <Route path="support" element={<Support />}></Route>
          {/* Bridge */}
          <Route path="bridge" element={<Bridge />}></Route>
        </Route>
        <Route path="/DeputyLayout" element={<DeputyLayout />}></Route>
      </Routes>
    </Suspense>
  );
}
