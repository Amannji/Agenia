type StockProps = {
  price: number;
  symbol: string;
};

export const Stock = ({ price, symbol }: StockProps) => {
  return (
    <div className="p-4 rounded-lg border border-gray-200 bg-white shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        Stock Information
      </h2>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Symbol:</span>
          <span className="font-mono font-medium text-gray-900">{symbol}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Price:</span>
          <span className="font-mono font-medium text-gray-900">
            ${price.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};
