/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

function VideoCall() {
  const location = useLocation();
  const navigate = useNavigate();
  const { roomID, username } = useParams();
  const zcRef = useRef<ZegoUIKitPrebuilt | null>(null);

  const userToChatId = location.state?.userToChatId;

  const containerRef = useRef<HTMLDivElement>(null);

  // Function for handle leaving room
  const handleLeaveRoom = () => {
    myCall(null);
    toast.info("Call ended");
    navigate("/message", { state: { userId: userToChatId } });
  };

  // Function for handle other user leaves
  const handleUserLeave = () => {
    myCall(null);
    toast.info("Call ended");
    navigate("/message", { state: { userId: roomID } });
  };

    // Cleanup function
    const cleanup = () => {
      if (zcRef.current) {
        zcRef.current.destroy();
        zcRef.current = null;
      }
    };

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
      cleanup();
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
        cleanup();
        handleLeaveRoom();
      },
      onUserLeave: () => {
        cleanup();
        handleUserLeave();
      },
      leaveRoomDialogConfig: {
        titleText: "End the call?",
        descriptionText: "Are you sure you want to end the call?",
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
