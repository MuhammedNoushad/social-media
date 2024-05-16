function MessageList() {
  const contacts = [
    {
      name: "Alice",
      avatar:
        "https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
      lastMessage: "Hoorayy!!",
    },
    {
      name: "Martin",
      avatar:
        "https://placehold.co/200x/ad922e/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
      lastMessage:
        "That pizza place was amazing! We should go again sometime. 🍕",
    },
    {
      name: "Charlie",
      avatar:
        "https://placehold.co/200x/2e83ad/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
      lastMessage:
        "Hey, do you have any recommendations for a good movie to watch?",
    },
    {
      name: "David",
      avatar:
        "https://placehold.co/200x/c2ebff/0f0b14.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
      lastMessage:
        "I just finished reading a great book! It was so captivating.",
    },
    {
      name: "Ella",
      avatar:
        "https://placehold.co/200x/e7c2ff/7315d1.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
      lastMessage: "What's the plan for this weekend? Anything fun?",
    },
    {
      name: "Fiona",
      avatar:
        "https://placehold.co/200x/ffc2e2/ffdbdb.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
      lastMessage:
        "I heard there's a new exhibit at the art museum. Interested?",
    },
    {
      name: "George",
      avatar:
        "https://placehold.co/200x/f83f3f/4f4f4f.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
      lastMessage: "I tried that new cafe downtown. The coffee was fantastic!",
    },
    {
      name: "Hannah",
      avatar:
        "https://placehold.co/200x/dddddd/999999.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
      lastMessage: "I'm planning a hiking trip next month. Want to join?",
    },
    {
      name: "Ian",
      avatar:
        "https://placehold.co/200x/70ff33/501616.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
      lastMessage: "Let's catch up soon. It's been too long!",
    },
    {
      name: "Jack",
      avatar:
        "https://placehold.co/200x/30916c/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
      lastMessage:
        "Remember that hilarious joke you told me? I can't stop laughing!",
    },
  ];

  return (
    <div className="p-4 border-x-2 border-gray-300 h-full">
      <header className="p-4 border-b border-gray-300 flex justify-center items-center text-black">
        <h1 className="text-2xl font-semibold font-roboto-condensed">
          Contacts
        </h1>
      </header>
      <div className="overflow-y-auto h-[calc(100vh-112px)]">
        {contacts.map((contact, index) => (
          <div
            key={index}
            className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
          >
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
              <img
                src={contact.avatar}
                alt={`${contact.name} Avatar`}
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold font-roboto-condensed">
                {contact.name}
              </h2>
              <p className="text-gray-600 font-roboto-condensed">
                {contact.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default MessageList;
