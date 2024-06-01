import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { RootState } from "../../../store/store";
import axios from "../../../axios/axios";
import { setUser } from "../../../store/features/userDetailsSlice";

// Function to load script and append in DOM tree.
const loadScript = (src: string): Promise<boolean> =>
  new Promise<boolean>((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      console.log("razorpay loaded successfully");
      resolve(true);
    };
    script.onerror = () => {
      console.log("error in loading razorpay");
      resolve(false);
    };
    document.body.appendChild(script);
  });

interface RenderRazorpayProps {
  orderId: string;
  keyId: string;
  keySecret: string;
  currency: string;
  amount: number;
  setDisplayRazorpay: React.Dispatch<React.SetStateAction<boolean>>;
}

const RenderRazorpay: React.FC<RenderRazorpayProps> = ({
  orderId,
  keyId,
  currency,
  amount,
  setDisplayRazorpay,
}) => {
  const paymentId = useRef<string | null>(null);
  const paymentMethod = useRef<string | null>(null);

  const user = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  // To load razorpay checkout modal script.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const displayRazorpay = async (options: any) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      console.log("Razorpay SDK failed to load. Are you online?");
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rzp1 = new (window as any).Razorpay(options);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rzp1.on("payment.submit", (response: any) => {
      paymentMethod.current = response.method;
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rzp1.on("payment.failed", (response: any) => {
      paymentId.current = response.error.metadata.payment_id;
      toast.error("Payment Failed");
    });

    // to open razorpay checkout modal.
    rzp1.open();
  };

  const options = {
    key: keyId,
    amount,
    currency,
    name: "YoYo",
    image: "/logo.webp",
    order_id: orderId,
    // This handler menthod is always executed in case of succeeded payment
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handler: async (response: any) => {
      console.log("succeeded");
      console.log(response);

      await axios.post("/api/payment/success", { userId: user._id });
      toast.success("Account verified successfully");

      dispatch(setUser({ ...user, isVerified: true }));

      setDisplayRazorpay(false);
    },
    modal: {
      confirm_close: true,
      // This function is executed when checkout modal is closed
      ondismiss: () => {
        setDisplayRazorpay(false);
        toast.error("Payment Failed");
      },
    },
    retry: {
      enabled: false,
    },
    timeout: 900,
    theme: {
      color: "#3399FF",
    },
  };

  useEffect(() => {
    console.log("in razorpay");
    displayRazorpay(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default RenderRazorpay;
