import { useNavigate, useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useEffect, useRef } from "react";

function VideoCall() {
  const navigate = useNavigate();
  const { roomID, username } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if the reload has already occurred
    const hasReloaded = sessionStorage.getItem("hasReloaded");
    if (!hasReloaded) {
      sessionStorage.setItem("hasReloaded", "true");
      window.location.reload();
    } else {
      // If already reloaded, ensure the call setup is done
      myCall(containerRef.current);
    }

    // Cleanup the reload flag when component unmounts
    return () => {
      sessionStorage.removeItem("hasReloaded");
    };
  }, []);

  const myCall = async (element: HTMLElement | null) => {
    if (!element) return;

    const appID = 1348115007;
    const serverSecret = "236873ee0f056898a58e263787adc6c1";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID ?? "",
      username ?? "",
      username
    );
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showPreJoinView: false,
      onLeaveRoom: () => {
        navigate("/message");
      },
    });
  };

  return (
    <div>
      <div ref={containerRef} className="w-full h-screen" />
    </div>
  );
}

export default VideoCall;
