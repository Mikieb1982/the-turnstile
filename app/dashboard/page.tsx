import SuperLeagueNews from '../components/SuperLeagueNews';

export default function DashboardPage() {
  return (
    <div className="font-body bg-background-dark text-gray-100">
      <div className="relative flex min-h-screen w-full flex-col">
        <header className="sticky top-0 z-40 bg-background-dark/80 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center justify-between p-4 h-16">
            <button className="flex size-10 items-center justify-center rounded-full text-gray-300 hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
            <h2 className="flex-1 text-center text-2xl font-display font-semibold uppercase tracking-wider text-gray-100">Dashboard</h2>
            <div className="size-10"></div>
          </div>
        </header>
        <main className="flex-grow p-4 pb-28">
          <div className="flex items-center gap-3 mb-6">
            <img alt="City Sentinels Team Logo" className="w-12 h-12" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKMh-MCHkvQlaFkwbFRu1CxKfkYNtmO5S8jykFfKxO8OiCL_o4ko8Bz2MOcMZe95nly4xNr0YTa_NT50wnX7Mlrc2QIx44BIdD0Ysp2rjq43RjjaFMFpuphybSHjxLb0PRkbT0Vp0H_eK3x82toSLmYAwx7GHa1Ryuq1M5Cnx2cKeshGrigc71iOL3KcV-2EWgv3HlqRoKGHaMVbNJWtLWYeJC68ypM_45Vr3G6DrjH0hA3IKt8gRd1yjGVbT0KnIdMxYfG-By-UYx" />
            <div>
              <p className="text-sm text-gray-400">Your Team</p>
              <h1 className="text-5xl font-display font-bold uppercase tracking-wide text-white leading-tight">City Sentinels</h1>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5">
            <div className="bg-gradient-to-br from-primary/30 to-card-dark p-4 rounded-xl shadow-card border border-primary/50 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl">location_on</span>
                <div>
                  <h3 className="text-2xl font-display font-semibold text-white uppercase tracking-wide">You&apos;re at the game!</h3>
                  <p className="text-sm text-gray-300">City Stadium</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 text-center border-y border-white/10 py-3 my-1">
                <div className="flex flex-col items-center gap-2 w-1/3">
                  <img alt="City Sentinels logo" className="w-10 h-10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKMh-MCHkvQlaFkwbFRu1CxKfkYNtmO5S8jykFfKxO8OiCL_o4ko8Bz2MOcMZe95nly4xNr0YTa_NT50wnX7Mlrc2QIx44BIdD0Ysp2rjq43RjjaFMFpuphybSHjxLb0PRkbT0Vp0H_eK3x82toSLmYAwx7GHa1Ryuq1M5Cnx2cKeshGrigc71iOL3KcV-2EWgv3HlqRoKGHaMVbNJWtLWYeJC68ypM_45Vr3G6DrjH0hA3IKt8gRd1yjGVbT0KnIdMxYfG-By-UYx" />
                  <p className="font-display text-lg font-medium leading-snug text-gray-100 uppercase">City<br />Sentinels</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-xs text-gray-400">vs</p>
                </div>
                <div className="flex flex-col items-center gap-2 w-1/3">
                  <img alt="Coastal Sharks logo" className="w-10 h-10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKMh-MCHkvQlaFkwbFRu1CxKfkYNtmO5S8jykFfKxO8OiCL_o4ko8Bz2MOcMZe95nly4xNr0YTa_NT50wnX7Mlrc2QIx44BIdD0Ysp2rjq43RjjaFMFpuphybSHjxLb0PRkbT0Vp0H_eK3x82toSLmYAwx7GHa1Ryuq1M5Cnx2cKeshGrigc71iOL3KcV-2EWgv3HlqRoKGHaMVbNJWtLWYeJC68ypM_45Vr3G6DrjH0hA3IKt8gRd1yjGVbT0KnIdMxYfG-By-UYx" />
                  <p className="font-display text-lg font-medium leading-snug text-gray-100 uppercase">Coastal<br />Sharks</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 w-full text-center rounded-lg py-2 bg-primary/20 text-primary font-bold">
                <span className="material-symbols-outlined text-xl">check_circle</span>
                <span className="font-display uppercase tracking-wider text-lg">You&apos;re Checked In!</span>
              </div>
            </div>
            <div className="bg-card-dark p-4 rounded-xl shadow-card border border-white/10 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-display font-semibold text-white uppercase tracking-wide">Fans at the Match</h3>
                <div className="flex -space-x-2">
                  <img alt="Avatar" className="inline-block h-6 w-6 rounded-full ring-2 ring-card-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVHAdNeamCto0VHtMDVcTrZiPZ-U_pCtVOJTl_-8AW_xAao0_HEaNuR3eQQtm4305ewEzAMTwf0uE6CnnDyOqGz9Fe1s-8vMy-uwn1P1vIqTt9K5E_EOtxi5_5lyxiVokP6KKSEoQRb5c_pMwQLA9Ktl_3Evg91Yzd6NHenJniuwjbJgkq0OWl5mQhJqmMky-urEvPjheubRMpnCzYdPvpxL7V25oxTkyC9n6KFpLxmNx6KfXMlxOez3SUe1zfYG7Hv5ki4uOgG3WS" />
                  <img alt="Avatar" className="inline-block h-6 w-6 rounded-full ring-2 ring-card-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAc3bXYM4k4KL-pzjjSAenS468tFXviehnnxiUyIaFy-mNDPcyqwOQPWSoSvucR5VNXgqmDKda2GvWJzlOYvwpCkdzw6JtTGvMMYNsaKbpQDwffbng7DkTffD3srTaxFmq-XOLqRdB1BIBn4Yvj-TU5XDqGgs9kMtHMCQUxt7RAdn5eCgAFvegjYDd1xilvJqMeZdfgGQOE-rrJzE7rGAmqLEh8KULxK73BcdDjgpfC2FR5_ieW8Lu1RtQdkOXljuj94TjsOU8QYYMQ" />
                  <img alt="Avatar" className="inline-block h-6 w-6 rounded-full ring-2 ring-card-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCk3LEnDRYefHsx9ZtsvD8eGIpln2ZaLQ0engIXUzP28rpSckqI465J1wxcu1f4IkUPqaqzq5fMogf6qu9docM4r3p7POettPEfOt5As6dt_vha0I53djY6dxOSggJc2nHpi9jWH5yEG06pxYZyerHSaQsaVkm94qjdxO51MsB2pMIEze3DjkXiVN5ExG-X73qXMNihoYUQaH1sto497OpDnh8BKdO9oM5rOdeIBq5jPd9t4cWeUXyreIx0RoM4ibBnBgoNfeo318ze" />
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 ring-2 ring-card-dark">
                    <span className="text-xs font-semibold text-primary">23+</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img alt="User avatar" className="h-10 w-10 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPlOIt0QoLWoXjQ2KqN_y2937k6j5ep3j62DEvZwSBH13y5ymBAoRu9mgG_nR-Kyh1FxRO5d0FVZxTxqEPNqQCLgTcLu4TCbpdN22_5K5ChhNNqb5l27k4uHjRubCAvAzyNCZCgSXWNxn94CWCM5he3YzlulA82beWT3h_I4gztEj7OYlD7D459biSb4KbXGDLMsVPpi7Mk_PDXOzQYDzdD5rIm38GNdyTAC1AYItlPbk1ZOGLuv9Bf3TNgMbJoocaLkeQBCLv7F2a" />
                    <div>
                      <p className="font-semibold text-white">Liam_Fan12</p>
                      <p className="text-sm text-gray-400">Sentinels Supporter</p>
                    </div>
                  </div>
                  <button className="flex items-center justify-center gap-2 rounded-lg bg-accent/10 px-4 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent/20">
                    <span className="material-symbols-outlined text-lg">person_add</span>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img alt="User avatar" className="h-10 w-10 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3hQDtElfufrldNgQcF1id0gZiPUM-JNpDTyQw2OCn2oh4Inv5AXvpyAOrYU4KDQMDEgxVkuEuWGtxIDRz0qPjNkJgNmjX8fW0wdyFveivJIr7OcKB9JF9lWkArT9ggdIqffsyRHMgQunU-7djWTrX7oNEvQ-CqnZcSItPhGL-NsE0e_kw4Cr8D9b8Q8_oQYo7DBX6p8FgjAjOtq3fz6Cg0yQYN5YxO7E8X5pUh4kWeqe1Kia2WrpGNn5dODYNAESdCz5q7BY9jv9J" />
                    <div>
                      <p className="font-semibold text-white">RugbyRach</p>
                      <p className="text-sm text-gray-400">Sharks Fan</p>
                    </div>
                  </div>
                  <button className="flex items-center justify-center gap-2 rounded-lg bg-accent/10 px-4 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent/20">
                    <span className="material-symbols-outlined text-lg">person_add</span>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img alt="User avatar" className="h-10 w-10 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_SSex6ulhhLxrYbbcfvu1gRqwcX9NtgLiXkIOUQqmmcNe0YNVnyoIOZB2QURMrLd1_HJeImiCYtV3K6SKlDVkh6srPUEGHl1_nqhO_k5iPSvhlDViRWUiQAylvhniD_ybgBiqqnO-ZvLDQ-gKMWyrxbUJ2h6I5VKgCkv5yC7prVg_2OamUVtU7MxrF0kxL1GTGoWq25R0Mte9FFcmshOdvT1wLy362dMSVgVaYsK0s6PEWIWA4KevwIUcG2HTAURgnsxJCIJpuRti" />
                    <div>
                      <p className="font-semibold text-white">Tommo_SL</p>
                      <p className="text-sm text-gray-400">Sentinels Supporter</p>
                    </div>
                  </div>
                  <button className="flex items-center justify-center gap-2 rounded-lg bg-accent/10 px-4 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent/20">
                    <span className="material-symbols-outlined text-lg">person_add</span>
                  </button>
                </div>
              </div>
              <a className="mt-2 flex items-center justify-center gap-2 text-primary font-display uppercase tracking-wider text-lg w-full text-center rounded-lg py-2 bg-primary/10 hover:bg-primary/20 transition-colors" href="#">
                <span>View All</span>
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </a>
            </div>
            <div className="bg-card-dark p-4 rounded-xl shadow-card border border-white/10 flex flex-col gap-4">
              <h3 className="text-2xl font-display font-semibold text-white uppercase tracking-wide">My Stats</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-4xl font-display font-bold text-primary">12</p>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Matches Watched</p>
                </div>
                <div>
                  <p className="text-4xl font-display font-bold text-accent">5</p>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Achievements</p>
                </div>
                <div>
                  <p className="text-4xl font-display font-bold text-primary">78%</p>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Predictions</p>
                </div>
              </div>
              <div className="border-t border-white/10 pt-3 flex flex-col gap-3">
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Latest Achievement</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center size-10 bg-accent/20 rounded-full">
                    <span className="material-symbols-outlined text-accent text-2xl">emoji_events</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Hat-Trick Hero</p>
                    <p className="text-gray-400 text-sm">Correctly predicted 3 tries in a match.</p>
                  </div>
                </div>
              </div>
              <a className="mt-2 flex items-center justify-center gap-2 text-primary font-display uppercase tracking-wider text-lg w-full text-center rounded-lg py-2 bg-primary/10 hover:bg-primary/20 transition-colors" href="#">
                <span>View All Achievements</span>
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </a>
            </div>
            <div className="bg-card-dark p-4 rounded-xl shadow-card border border-white/10 flex flex-col gap-4">
              <h3 className="text-2xl font-display font-semibold text-white uppercase tracking-wide">Team Overview</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <p className="text-sm font-medium text-gray-300">League Position</p>
                  <p className="text-2xl font-display font-bold text-primary">3rd</p>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <p className="text-sm font-medium text-gray-300">Form (Last 5)</p>
                  <div className="flex items-center gap-1.5">
                    <span className="flex items-center justify-center text-xs font-bold text-green-900 bg-green-400 rounded-full w-5 h-5">W</span>
                    <span className="flex items-center justify-center text-xs font-bold text-green-900 bg-green-400 rounded-full w-5 h-5">W</span>
                    <span className="flex items-center justify-center text-xs font-bold text-red-900 bg-red-400 rounded-full w-5 h-5">L</span>
                    <span className="flex items-center justify-center text-xs font-bold text-green-900 bg-green-400 rounded-full w-5 h-5">W</span>
                    <span className="flex items-center justify-center text-xs font-bold text-green-900 bg-green-400 rounded-full w-5 h-5">W</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <p className="text-sm font-medium text-gray-300">Top Scorer</p>
                  <p className="text-sm font-semibold text-white">Liam Johnson (8 Tries)</p>
                </div>
              </div>
            </div>
            <div className="bg-card-dark p-4 rounded-xl shadow-card border border-white/10 flex flex-col gap-4">
              <h3 className="text-2xl font-display font-semibold text-white uppercase tracking-wide">Upcoming Fixture</h3>
              <div className="flex items-center gap-4 text-center">
                <div className="flex flex-col items-center gap-2 w-1/3">
                  <img alt="City Sentinels logo" className="w-12 h-12" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKMh-MCHkvQlaFkwbFRu1CxKfkYNtmO5S8jykFfKxO8OiCL_o4ko8Bz2MOcMZe95nly4xNr0YTa_NT50wnX7Mlrc2QIx44BIdD0Ysp2rjq43RjjaFMFpuphybSHjxLb0PRkbT0Vp0H_eK3x82toSLmYAwx7GHa1Ryuq1M5Cnx2cKeshGrigc71iOL3KcV-2EWgv3HlqRoKGHaMVbNJWtLWYeJC68ypM_45Vr3G6DrjH0hA3IKt8gRd1yjGVbT0KnIdMxYfG-By-UYx" />
                  <p className="font-display text-lg font-medium leading-snug text-gray-100 uppercase">City<br />Sentinels</p>
                </div>
                <div className="flex flex-col items-center flex-1">
                  <p className="text-gray-400 text-sm font-medium">Oct 29</p>
                  <p className="text-2xl font-display font-bold text-white">3:00 PM</p>
                  <p className="text-gray-400 text-xs">City Stadium</p>
                </div>
                <div className="flex flex-col items-center gap-2 w-1/3">
                  <img alt="Coastal Sharks logo" className="w-12 h-12" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKMh-MCHkvQlaFkwbFRu1CxKfkYNtmO5S8jykFfKxO8OiCL_o4ko8Bz2MOcMZe95nly4xNr0YTa_NT50wnX7Mlrc2QIx44BIdD0Ysp2rjq43RjjaFMFpuphybSHjxLb0PRkbT0Vp0H_eK3x82toSLmYAwx7GHa1Ryuq1M5Cnx2cKeshGrigc71iOL3KcV-2EWgv3HlqRoKGHaMVbNJWtLWYeJC68ypM_45Vr3G6DrjH0hA3IKt8gRd1yjGVbT0KnIdMxYfG-By-UYx" />
                  <p className="font-display text-lg font-medium leading-snug text-gray-100 uppercase">Coastal<br />Sharks</p>
                </div>
              </div>
              <a className="mt-2 flex items-center justify-center gap-2 text-primary font-display uppercase tracking-wider text-lg w-full text-center rounded-lg py-2 bg-primary/10 hover:bg-primary/20 transition-colors" href="#">
                <span>View Fixtures</span>
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </a>
            </div>
            <div className="bg-card-dark p-4 rounded-xl shadow-card border border-white/10 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-display font-semibold text-white uppercase tracking-wide">Recent Result</h3>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  <p className="text-red-400 text-sm font-semibold tracking-wide">LIVE</p>
                </div>
              </div>
              <div className="flex justify-between items-center text-center">
                <div className="flex flex-col items-center gap-2 w-1/3">
                  <img alt="City Sentinels logo" className="w-12 h-12" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKMh-MCHkvQlaFkwbFRu1CxKfkYNtmO5S8jykFfKxO8OiCL_o4ko8Bz2MOcMZe95nly4xNr0YTa_NT50wnX7Mlrc2QIx44BIdD0Ysp2rjq43RjjaFMFpuphybSHjxLb0PRkbT0Vp0H_eK3x82toSLmYAwx7GHa1Ryuq1M5Cnx2cKeshGrigc71iOL3KcV-2EWgv3HlqRoKGHaMVbNJWtLWYeJC68ypM_45Vr3G6DrjH0hA3IKt8gRd1yjGVbT0KnIdMxYfG-By-UYx" />
                  <p className="font-display text-lg font-medium leading-snug text-gray-100 uppercase">City<br />Sentinels</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-primary text-5xl font-display font-bold animate-pulse-score">24</p>
                  <p className="text-gray-500 text-4xl font-display font-bold">-</p>
                  <p className="text-white text-5xl font-display font-bold">18</p>
                </div>
                <div className="flex flex-col items-center gap-2 w-1/3">
                  <img alt="Opponent team logo" className="w-12 h-12" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaC48V8W4MeE7DVKffUFBR6Pclq7C2ir9XJIQbVk9HR6EDOPMGiXZ2Gg8DYNOGtB0DIzC91IiVuuvmC6rMHtNuxbN8nHoMdykRALtmN2SneVFXwuvVpdfF_DtZG37pv2khHJFCICp_Wb3fCO5vM6UiiOdnsYaaZSvaxYh9_xCdndFlqk1FxSF_zfOI0hteoVji8rH6-1WE3YJ2pjNlP7vLesp2TMqCplKbsvRwzG2JLWx_pJmGMDh6iZBe4RFlTXIRrv7R8VzkaOE1" />
                  <p className="font-display text-lg font-medium leading-snug text-gray-100 uppercase">Valley<br />Vikings</p>
                </div>
              </div>
              <div className="border-t border-white/10 pt-3 transition-opacity duration-500">
                <p className="text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">Live Update (67&apos;)</p>
                <div className="flex items-center gap-3 text-sm">
                  <span className="material-symbols-outlined text-primary text-xl">sports_rugby</span>
                  <p className="text-gray-200">Try - J. Archer</p>
                </div>
              </div>
              <a className="mt-2 flex items-center justify-center gap-2 text-primary font-display uppercase tracking-wider text-lg w-full text-center rounded-lg py-2 bg-primary/10 hover:bg-primary/20 transition-colors" href="#">
                <span>View Match Centre</span>
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
