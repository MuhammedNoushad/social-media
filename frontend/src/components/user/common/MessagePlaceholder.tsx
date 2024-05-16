function MessagePlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <img
        src="/public/message placeholder.jpg"
        alt="Message Placeholder"
        className="max-w-xs"
      />
      <p className="mt-4 text-gray-500 font-roboto-condensed font-semibold">
        Select a conversation to start messaging
      </p>
    </div>
  );
}

export default MessagePlaceholder;
