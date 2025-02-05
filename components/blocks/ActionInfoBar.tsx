import { useWallets } from "@privy-io/react-auth";

export default function ActionInfoBar() {
  const { wallets } = useWallets();
  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType === "privy"
  );
  return (
    <div className="col-span-3 bg-gray-50">
      <div className="w-full m-2 p-2 rounded-lg flex gap-10 bg-gray-100">
        <div className="flex flex-col items-center">
          <p>400</p>
          <h2>Credits Used</h2>
        </div>
        <div className="flex flex-col items-center">
          <p>8</p>
          <h2>Actions Done</h2>
        </div>
      </div>
      <div className="w-full m-2 p-2 rounded-lg flex flex-col gap-2 bg-gray-100">
        <h3 className="text-sm font-medium text-gray-600">Connected Wallet</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <p className="font-mono text-sm text-gray-800">
            {embeddedWallet?.address ? (
              <>
                {embeddedWallet.address.slice(0, 6)}...................
                {embeddedWallet.address.slice(-4)}
              </>
            ) : (
              "No wallet connected"
            )}
          </p>
        </div>
      </div>
      <div className="w-full m-2 p-2 h-[15rem] rounded-lg flex gap-10 bg-gray-100"></div>
    </div>
  );
}
