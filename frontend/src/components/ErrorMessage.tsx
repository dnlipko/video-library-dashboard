import { HiXCircle } from 'react-icons/hi';

interface ErrorMessageProps {
  error: string;
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return (
    <div className="col-span-full p-12">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-4">
          <HiXCircle className="h-8 w-8 text-red-400" />
        </div>
        <h3 className="text-lg font-semibold text-red-800 mb-2">{error}</h3>
        <p className="text-red-500 max-w-sm mx-auto">
          Please try again or contact support if the problem persists.
        </p>
      </div>
    </div>
  );
}; 