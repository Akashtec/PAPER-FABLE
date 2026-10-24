(function () {
  "use strict";

  var sparkSelect = document.getElementById("spark");
  var weatherSelect = document.getElementById("weather");
  var companionSelect = document.getElementById("companion");
  var form = document.getElementById("recipe-form");
  var paper = document.getElementById("story-paper");
  var pageNumber = document.getElementById("page-number");
  var storyKicker = document.getElementById("story-kicker");
  var storyTitle = document.getElementById("story-title");
  var storyCopy = document.getElementById("story-copy");
  var storyMoral = document.getElementById("story-moral");
  var copyButton = document.getElementById("copy-button");
  var resetButton = document.getElementById("reset-button");
  var actionStatus = document.getElementById("action-status");
  var fableNumber = 1;

  var sparks = {
    seed: {
      name: "The Paper Seed",
      title: "The Seed That Remembered Spring",
      opening: "Inside a book no one borrowed, you found a paper seed folded into a line of forgotten verse. It was no bigger than a comma, but it felt warm, as if it had been waiting for your hand.",
      destination: "a garden where forgotten promises had grown into little glowing flowers",
      moral: "A small beginning is still a beginning."
    },
    key: {
      name: "The Brass Key",
      title: "The Key to the Almost-Anywhere Door",
      opening: "At the edge of a path that did not appear on any map, you found a little brass key. It was warm from the inside, and its teeth were shaped like the outline of a distant hill.",
      destination: "a tiny door hidden in the oldest tree, which opened only when you stopped trying to be certain",
      moral: "Not every door needs a plan."
    },
    star: {
      name: "The Fallen Star",
      title: "The Star That Missed the Sky",
      opening: "A small star tumbled out of the evening and landed softly in your palm. It shone like a thought you had nearly forgotten, and left a little constellation of freckles across your fingers.",
      destination: "a quiet observatory where lost wishes were mended like paper lanterns",
      moral: "Even lost light can help you find your way."
    }
  };

  var weathers = {
    rain: {
      name: "the first rain",
      scene: "Outside, the first rain wrote tiny footnotes on the leaves. The whole forest smelled of wet stone and green things beginning again."
    },
    wind: {
      name: "the amber autumn wind",
      scene: "Outside, an amber wind carried the smell of oranges and distant chimneys. Dry leaves passed like little boats on an invisible river."
    },
    mist: {
      name: "the morning mist",
      scene: "Outside, morning mist tucked the hills into soft envelopes. Somewhere far off, a bell rang once, as if the day had just remembered its own name."
    }
  };

  var companions = {
    fox: {
      name: "the fox",
      description: "A fox with ink-dark paws appeared beside you, carrying the quiet certainty of someone who knew the way home—and a few roads beyond it."
    },
    moth: {
      name: "the moth",
      description: "A moon-white moth settled on your sleeve. Its wings looked like two tiny pages, and it fluttered ahead whenever the path seemed to lose its courage."
    },
    dog: {
      name: "the old dog",
      description: "An old, sleepy dog joined you with the seriousness of a trusted friend. It walked slowly, stopping often to inspect ordinary things that turned out not to be ordinary at all."
    }
  };

  var endings = [
    "Together, you followed the path to DESTINATION. You left a small gift there and did not wait to see who would find it. Some things become brighter when they are shared.",
    "At last, you reached DESTINATION. Nothing asked you to be clever or brave; it only asked you to be there. For once, that was more than enough.",
    "The path led to DESTINATION. You thought the journey would change the world, but first it changed the way you looked at it. Even the smallest things had been holding the door open."
  ];

  var morals = [
    "A small beginning is still a beginning.",
    "The world is wider when you walk gently.",
    "Wonder is a kind of wayfinding."
  ];

  function setText(id, value) {
    document.getElementById(id).textContent = value;
  }

  function getSelected(select, collection) {
    return collection[select.value] || collection[Object.keys(collection)[0]];
  }

  function renderStory(animate) {
    var spark = getSelected(sparkSelect, sparks);
    var weather = getSelected(weatherSelect, weathers);
    var companion = getSelected(companionSelect, companions);
    var endingIndex = (fableNumber - 1) % endings.length;
    var ending = endings[endingIndex].replace("DESTINATION", spark.destination);

    setText("page-number", "NO. " + String(fableNumber).padStart(2, "0"));
    setText("story-kicker", spark.name.toUpperCase() + " · A LITTLE FABLE");
    setText("story-title", spark.title);
    storyCopy.replaceChildren();

    var paragraphs = [spark.opening, weather.scene + " " + companion.description, ending];
    paragraphs.forEach(function (paragraph) {
      var p = document.createElement("p");
      p.textContent = paragraph;
      storyCopy.appendChild(p);
    });

    setText("story-moral", morals[endingIndex] || spark.moral);
    if (animate) {
      paper.classList.remove("fable-change");
      void paper.offsetWidth;
      paper.classList.add("fable-change");
    }
    actionStatus.textContent = "Fable " + fableNumber + " is ready.";
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    fableNumber += 1;
    renderStory(true);
  });

  resetButton.addEventListener("click", function () {
    sparkSelect.value = "seed";
    weatherSelect.value = "rain";
    companionSelect.value = "fox";
    fableNumber = 1;
    renderStory(true);
    actionStatus.textContent = "Back to the first page.";
  });

  function getFullStory() {
    var paragraphs = Array.prototype.map.call(storyCopy.querySelectorAll("p"), function (p) {
      return p.textContent;
    });
    return storyTitle.textContent + "\n\n" + paragraphs.join("\n\n") + "\n\n" + storyMoral.textContent;
  }

  function fallbackCopy(text) {
    var field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    var succeeded = false;
    try { succeeded = document.execCommand("copy"); } catch (error) { succeeded = false; }
    field.remove();
    return succeeded;
  }

  copyButton.addEventListener("click", function () {
    var story = getFullStory();
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(story).then(function () {
        actionStatus.textContent = "Your fable has been copied.";
        copyButton.querySelector("span").textContent = "Copied to clipboard";
      }).catch(function () {
        var success = fallbackCopy(story);
        copyButton.querySelector("span").textContent = success ? "Copied to clipboard" : "Select story to copy";
        actionStatus.textContent = success ? "Your fable has been copied." : "Copy was not available in this browser.";
      });
    } else {
      var success = fallbackCopy(story);
      copyButton.querySelector("span").textContent = success ? "Copied to clipboard" : "Copy unavailable here";
      actionStatus.textContent = success ? "Your fable has been copied." : "Copy was not available in this browser.";
    }
    window.setTimeout(function () {
      copyButton.querySelector("span").textContent = "Copy your fable";
    }, 2200);
  });

  renderStory(false);
})();