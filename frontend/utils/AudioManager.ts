export const AudioManager = {
  alarm: new Audio("/sounds/alarm.mp3"),
  error: new Audio("/sounds/error.mp3"),
  success: new Audio("/sounds/success.mp3"),

  play(type: "alarm" | "error" | "success") {
    const audio = this[type];
    audio.currentTime = 0;
    audio.play();
  },
};
