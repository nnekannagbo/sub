document.addEventListener("DOMContentLoaded", function () {
  const chatBox = document.getElementById("chat-box");
  const userInput = document.getElementById("user-input");
  const sendButton = document.getElementById("send-button");

  // Define the conversation messages with timestamps
  const conversation = [
    {
      text: "Hey, it was nice meeting you last night.",
      timestamp: getCurrentTime(),
    },
    {
      text: "I'm wondering if you'd like to hang out sometime when this quarantine is over?",
      timestamp: getCurrentTime(),
    },
    // Add more messages here
  ];

  let currentMessageIndex = 0; // Track the index of the current message
  let finalMessageSent = false; // Track if the final message has been sent

  // Initialize the chat with the first message
  displayMessage("Character", conversation[currentMessageIndex]);

  sendButton.addEventListener("click", function () {
    const userMessage = userInput.value;
    if (userMessage.trim() !== "") {
      // Add user's message to the chat box with a "Delivered" status
      const userMessageObj = {
        text: userMessage,
        timestamp: getCurrentTime(),
        status: "Delivered",
      };
      displayMessage("You", userMessageObj);
      userInput.value = ""; // Clear the input field

      // Display the next message in the conversation
      currentMessageIndex++;
      if (currentMessageIndex < conversation.length) {
        setTimeout(() => {
          const characterMessage = conversation[currentMessageIndex];
          displayMessage("Character", characterMessage);
        }, 1000); // Delay for effect (1 second in this example)
      } else if (!finalMessageSent) {
        // After the last user message and if the final message hasn't been sent yet,
        // send the final pre-programmed message and set the flag to true
        setTimeout(() => {
          const finalMessage = {
            text: "Okay cool! I gotta run but I'll text you later.",
            timestamp: getCurrentTime(),
          };
          displayMessage("Character", finalMessage);
          finalMessageSent = true;
        }, 30000); // Delay for 30 seconds
      }
    }
  });

  // Function to display messages with timestamps and status
  function displayMessage(sender, message) {
    chatBox.innerHTML += `<p>${sender} (${message.timestamp}): ${message.text}</p>`;
    if (message.status) {
      chatBox.innerHTML += `<p class="status">${message.status}</p>`;
    }
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
  }

  // Function to get the current time in HH:MM format
  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }
});
