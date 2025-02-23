interface JargonWord {
  word: string;
  price: number;
}

export const defaultJargonWords: JargonWord[] = [
  // Strategy & Business
  { word: "synergy", price: 2.00 },
  { word: "leverage", price: 1.50 },
  { word: "paradigm shift", price: 2.50 },
  { word: "think outside the box", price: 2.00 },
  { word: "value add", price: 1.50 },
  { word: "low hanging fruit", price: 1.75 },
  { word: "bandwidth", price: 1.50 },
  
  // Project Management
  { word: "circle back", price: 1.00 },
  { word: "touch base", price: 1.00 },
  { word: "deep dive", price: 1.50 },
  { word: "action item", price: 1.00 },
  { word: "deliverable", price: 1.00 },
  { word: "move the needle", price: 1.75 },
  { word: "game plan", price: 1.25 },
  
  // Communication
  { word: "reach out", price: 1.00 },
  { word: "ping me", price: 1.00 },
  { word: "keep me in the loop", price: 1.50 },
  { word: "let's take this offline", price: 1.75 },
  { word: "on my radar", price: 1.25 },
  
  // Tech & Innovation
  { word: "disruptive", price: 2.00 },
  { word: "bleeding edge", price: 1.75 },
  { word: "agile", price: 1.50 },
  { word: "scalable", price: 1.50 },
  { word: "future proof", price: 2.00 },
  
  // Problem Solving
  { word: "drill down", price: 1.50 },
  { word: "unpack", price: 1.25 },
  { word: "pain point", price: 1.50 },
  { word: "solution", price: 1.00 },
  { word: "best practice", price: 1.50 },
  
  // Expensive Classics
  { word: "blockchain", price: 3.00 },
  { word: "ai driven", price: 3.00 },
  { word: "digital transformation", price: 2.50 },
  { word: "machine learning", price: 2.50 },
  { word: "web3", price: 3.00 }
]; 