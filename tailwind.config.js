module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        imagePrimary:
          "url('https://cdn.pixabay.com/photo/2017/06/21/07/33/background-2426328_960_720.jpg')",
        imageHome:
          "url('https://content.thriveglobal.com/wp-content/uploads/2021/08/overcome-challenges.jpg?w=1550')",
        imageHomeMini:
          "url('https://media.istockphoto.com/photos/using-scissors-cut-the-word-on-paper-impossible-become-possible-picture-id529676980?k=20&m=529676980&s=612x612&w=0&h=637UgfMOsA4Zvw1qkJW2mi8yORkGNzJ3AdUseRs-gyc=')",
      },
    },
    screens: {
      mini: { max: "899px" },
    },
  },
  plugins: [],
};
