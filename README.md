# SpinX - Casino Gaming Platform Frontend

Welcome to SpinX, a modern cryptocurrency casino gaming platform built with Next.js. This platform offers multiple provably fair games including Coinflip, Crash, Mines, and Roulette.


![SpinX Platform Dashboard](https://github.com/user-attachments/assets/93c1e56a-ce23-4e99-aec1-dc010fb5e6e3)   
*Main dashboard showing all available games*

## Table of Contents

- [Quick Start](#quick-start)
- [Technical Setup](#technical-setup)
- [Game Guides](#game-guides)
  - [Coinflip Game](#1-coinflip-game)
  - [Crash Game](#2-crash-game)
  - [Mines Game](#3-mines-game)
  - [Roulette Game](#4-roulette-game)
- [Features](#features)
- [Technologies](#technologies)

---

## Quick Start

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Technical Setup

### Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm/bun package manager
- Backend server running (see backend README)

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file based on `env.example`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_WS_URL=ws://localhost:5000
```

4. Run the development server:
```bash
npm run dev
```

### Project Structure

- `/src/app` - Next.js app router pages
- `/src/components` - Reusable React components
- `/src/contexts` - React contexts (Auth, Socket, GameSettings)
- `/src/lib` - Utility functions and API clients
- `/src/types` - TypeScript type definitions

---

## Game Guides

### 1. Coinflip Game

![Coinflip Game Interface](https://github.com/user-attachments/assets/ae44213b-0f87-46a7-b943-9d4d3d5aaa6e)   
*Coinflip game main interface showing active games*

Coinflip is a head-to-head game where two players bet on opposite sides of a coin flip. The winner takes the entire pot (minus house fee).

#### How to Play Coinflip

**Step 1: Create a Game or Join an Existing Game**

![Create Coinflip Game](https://github.com/user-attachments/assets/1888ff6a-83d8-4f8b-846c-38e7e3bd9a06)    
*Creating a new coinflip game with bet amount and side selection*

**To Create a Game:**
1. Navigate to the Coinflip game page
2. Enter your wager amount (minimum 0.01 USDT)
3. Select your coin side:
   - **Heads** - The heads side of the coin
   - **Tails** - The tails side of the coin
4. Click **"Create Game"** button
5. Your bet amount will be deducted from your balance
6. Wait for an opponent to join

**To Join a Game:**
1. Browse the "Active Games" section
2. Find a game with a bet amount you're comfortable with
3. Click **"Join"** button on the game card
4. You'll automatically be assigned the opposite side

![Join Coinflip Game](https://github.com/user-attachments/assets/4a2a7518-314b-431b-88f0-03c9cc7dd1c5)   
*Joining an existing coinflip game - modal showing game details*

**Step 2: Wait for the Coin Flip**

Once both players have joined:
1. A countdown timer will appear (3-5 seconds)
2. The coin flip animation will play
3. The result will be displayed with the winning side

![Coinflip Animation](https://github.com/user-attachments/assets/e3bed0a7-cba8-49b0-b37b-a74c6c645d93)   
*Coin flip animation in progress*

**Step 3: View Results**

![Coinflip Results](https://github.com/user-attachments/assets/0c2ef618-364c-4787-b7e2-5245a68b82f1)   
*Game result showing the winner and payout*

- If you win:
  - Your balance will be automatically credited with the total pot
  - Win amount = (Your bet × 2) - house fee
  - A success notification will appear
  
- If you lose:
  - Your initial bet is lost
  - You can immediately start a new game

**Step 4: Cash Out**

⚠️ **Note:** Coinflip has automatic cashout - winnings are credited instantly after the flip result.

**Tips:**
- Check the opponent's level and stats before joining
- Start with smaller bets to learn the game
- Your client seed affects the game outcome - set it in profile settings
- All games are provably fair - verify using the server seed hash

---

### 2. Crash Game

![Crash Game Interface](https://github.com/user-attachments/assets/5acda1f8-d4c2-4d03-b180-a796f1bcaf2a)   
*Crash game interface showing the multiplier graph*

Crash is a multiplayer game where a multiplier increases from 1.00x until it randomly "crashes". Players must cash out before the crash to win.

#### How to Play Crash

**Step 1: Place Your Bet**

![Crash Bet Panel](https://github.com/user-attachments/assets/3fab98c1-3e6b-4c3c-9130-5714b2cc7abd)   
*Crash game betting panel with bet amount and auto-cashout settings*

1. Navigate to the Crash game page
2. Wait for the betting phase (indicated by countdown timer)
3. Enter your bet amount:
   - Minimum bet: 0.001 USDT
   - Maximum bet: 1000 USDT
4. (Optional) Enable Auto Cashout:
   - Toggle "Auto Cashout" switch
   - Set your target multiplier (e.g., 2.00x)
   - Game will automatically cash out when this multiplier is reached
5. Click **"Place Bet"** button
6. Your bet is locked in when the round starts

**Step 2: Watch the Multiplier Rise**

![Crash Multiplier Rising](https://github.com/user-attachments/assets/b9bc9d57-6a4e-4c5b-aa53-50ad21bd2fa7)   
*Multiplier increasing during an active crash round*

- The multiplier starts at 1.00x and increases exponentially
- The graph shows real-time multiplier progression
- Watch other players cash out (shown on the graph)
- The multiplier can crash at any moment

**Step 3: Cash Out (Manual)**

![Crash Manual Cashout](https://github.com/user-attachments/assets/e8e9ac82-407a-4aef-bf46-2b73af7456da)   
*Manual cashout button highlighted during active game*

**To manually cash out:**
1. Click the **"Cash Out"** button while the multiplier is rising
2. Your payout = Bet Amount × Current Multiplier
3. Your winnings are instantly credited to your balance
4. You'll see a confirmation showing your profit

**Automatic Cashout:**
- If you enabled auto-cashout, the game will automatically cash you out at your target multiplier
- No action needed - just watch!

![Crash Auto Cashout](https://github.com/user-attachments/assets/8316dd58-0687-499a-ab4c-56aae26a7ff3)   
*Auto-cashout triggered at target multiplier*

**Step 4: View Results**

![Crash Round Complete](https://github.com/user-attachments/assets/d922b4b8-f3d3-4805-b069-8759ec73c8ce)   
*Crash point displayed with all players' results*

After the crash:
- The crash point is displayed (e.g., "Crashed at 2.45x")
- View who cashed out successfully (green)
- See who didn't cash out in time (red)
- Your result is highlighted

**Step 5: Review History**

![Crash History](https://github.com/user-attachments/assets/236b2fee-13a6-4c48-a550-791e2f162ce0)   
*Your personal crash game history with wins/losses*

- View your game history at the bottom of the page
- See your bet amount, cashout multiplier, and profit/loss
- Track your performance over time

**Tips:**
- Start with low auto-cashout multipliers (1.5x - 2.0x) for consistent small wins
- Higher multipliers = higher risk but bigger rewards
- The crash point is provably fair using cryptographic seeds
- Don't get greedy - the game can crash at any moment!

---

### 3. Mines Game

![Mines Game Interface](https://github.com/user-attachments/assets/db8dfe7f-6dc1-480f-857d-8af212a095f8)   
*Mines game board with a 5×5 grid*

Mines is a minesweeper-style game where you reveal tiles to find gems while avoiding mines. Each gem increases your multiplier, and you can cash out at any time.

#### How to Play Mines

**Step 1: Configure Game Settings**

![Mines Configuration](https://github.com/user-attachments/assets/5c93d118-bb19-422a-86ad-8d88865538df)   
*Game settings panel showing mine count and bet amount*

1. Navigate to the Mines game page
2. Set your wager amount:
   - Use quick bet buttons (1, 10, 100, 1K)
   - Or enter a custom amount
   - Use 1/2 or 2x buttons to adjust
3. Select number of mines (1-24):
   - Fewer mines = Lower multiplier per gem
   - More mines = Higher multiplier per gem, but more risk
   - Use the slider to adjust mine count
4. Click **"PLAY"** button to start
5. Your bet amount is deducted from balance

**Step 2: Reveal Gems**

![Mines Revealing Tiles](https://github.com/user-attachments/assets/d76fe687-fa28-4154-a64a-62e9cfe762bf)   
*Player revealing tiles - showing revealed gems and hidden tiles*

1. A 5×5 grid (25 tiles total) appears
2. Click on any tile to reveal it
3. **Two possible outcomes:**

   **Finding a Gem (✨):**
   - Tile turns green with a gem icon
   - Your multiplier increases
   - Potential payout updates
   - You can continue playing or cash out
   
   **Hitting a Mine (💣):**
   - Tile turns red with a bomb icon
   - Game immediately ends
   - You lose your bet amount
   - All mine locations are revealed

![Mines Hit Bomb](https://github.com/user-attachments/assets/0610b8c9-d7d5-42c0-b96b-a515a7cc4639)   
*Game over screen after hitting a mine*

**Step 3: Monitor Your Progress**

![Mines Stats Panel](https://github.com/user-attachments/assets/865dfb84-0399-4261-8917-b86b97f425e6)   
*Stats panel showing current multiplier and potential payout*

Watch the stats panel for:
- **Current Multiplier:** Increases with each gem found
- **Potential Payout:** Bet Amount × Current Multiplier
- **Gems Found:** X out of total available gems
- **Server Seed Hash:** For provably fair verification

**Step 4: Cash Out**
<img width="335" height="368" alt="19" src="" />

![Mines Cashout](https://github.com/user-attachments/assets/3ece6429-0af4-4dd4-922e-c1ed26cf745c)   
*Cash out button becomes available after finding gems*

**To cash out:**
1. Click the **"CASH OUT"** button (available after finding at least 1 gem)
2. Your payout is calculated: Bet Amount × Current Multiplier
3. Winnings are instantly credited to your balance
4. All tile positions are revealed (gems and mines)
5. Game ends successfully

**Step 5: View Game Results**

![Mines Win Result](https://github.com/user-attachments/assets/388ebab8-1d94-40cf-b730-e493ad41a923)   
*Successful cashout showing all revealed tiles and winnings*

**Win Screen:**
- Shows your final multiplier
- Displays profit amount (Payout - Bet Amount)
- Total payout highlighted in green
- All tiles revealed (gems in green, mines in red)

![Mines Game History](https://github.com/user-attachments/assets/5901d0e2-e1b6-4660-9b19-ce4b21418b5a)   
*Personal game history showing past mines games*

**Tips:**
- Start with fewer mines (3-5) to learn the game
- More mines = exponentially higher multipliers
- Each gem's multiplier increase depends on total mines
- Cash out early for consistent small wins
- Play longer for bigger multipliers (but higher risk)
- The game uses provably fair system - verify each round

**Multiplier Examples:**
- 3 mines: ~1.1x per gem
- 10 mines: ~1.4x per gem  
- 20 mines: ~4.5x per gem
- Finding all gems with 20 mines can give 100x+ multiplier!

---

### 4. Roulette Game

![Roulette Game Interface](https://github.com/user-attachments/assets/00384087-2a54-444d-a2f5-2ec023d2f9bb)      
*Roulette game showing the spinning wheel and current pot*

Roulette is a community jackpot game where players bet on Heads, Tails, or Crown. All bets go into a pot, and one winning side is randomly selected. Winners split the pot based on their bet proportions.

#### How to Play Roulette

**Step 1: Place Your Bet**

![Roulette Betting Panel](https://github.com/user-attachments/assets/2d94c5d2-0cee-4183-80c8-34f48b321371)   
*Betting panel with bet amount input and side selection*

1. Navigate to the Roulette game page
2. Wait for or join the current betting round
3. Enter your bet amount:
   - Minimum: 0.01 USDT
   - Maximum: 1000 USDT per bet
4. **Select your bet type:**

   ![Roulette Bet Types](https://github.com/user-attachments/assets/09c4ea27-1698-4f00-b711-b8fe702beaa8)   
   *Three bet types: Heads (2x), Crown (10x), Tails (2x)*

   - **Heads (2x multiplier):** 
     - 50% chance (excluding crown)
     - Win = Your bet × 2
   
   - **Tails (2x multiplier):**
     - 50% chance (excluding crown)
     - Win = Your bet × 2
   
   - **Crown (10x multiplier):**
     - ~10% chance
     - Win = Your bet × 10
     - Higher risk, much higher reward!

5. Click **"BET [TYPE]"** button (e.g., "BET HEADS")
6. Your bet is placed and added to the total pot

**Step 2: Wait for Round to Start**

![Roulette Countdown](https://github.com/user-attachments/assets/690ae787-77a3-4b15-9db9-d71e85c95828)   
*Countdown timer showing time remaining to place bets*

- Betting phase typically lasts 30-60 seconds
- Countdown timer shows remaining time
- Watch the pot grow as more players join
- View current players and their bets in real-time
- You can only bet once per round

**Current Pot Display:**
- Total USDT in the pot
- Number of players
- Breakdown by bet type:
  - Heads total and player count
  - Crown total and player count
  - Tails total and player count

![Roulette Current Players](https://github.com/user-attachments/assets/c264f981-2d48-4175-9b9a-a60130e9b862)   
*List of current players with their stakes and bet types*

**Step 3: Watch the Spin**

![Roulette Spinning](https://github.com/user-attachments/assets/cf6feb7d-f7b3-4901-8ca1-f6947c9fe26f)   
*Roulette wheel spinning animation*

When betting closes:
1. "DRAWING..." status appears
2. Roulette wheel starts spinning
3. Dramatic animation builds suspense
4. Wheel slows down and stops on winning symbol
5. Result is revealed!

**Step 4: View Results**

![Roulette Results Modal](https://github.com/user-attachments/assets/0476652c-2d91-4557-94af-acb43af112dc)      
*Results modal showing winning type and all winners*

**Results Modal Shows:**
- **Winning Type:** Heads, Tails, or Crown with icon
- **Total Pot:** Total USDT wagered by all players
- **Your Result:**
  - If you won: Green banner with your payout
  - If you lost: Red banner with better luck message
- **Winners List:**
  - All winning players
  - Each player's bet amount
  - Each player's payout
  - Their bet type

**Step 5: Collect Winnings (Automatic)**

⚠️ **Note:** Roulette has automatic payout - winnings are credited instantly when results are shown.

**If you WIN:**
```
Your Payout = Your Bet × Multiplier × (Your Share of Winning Pool)
```

Example:
- You bet 10 USDT on Heads
- Total Heads bets: 100 USDT (your share: 10%)
- Heads wins!
- Winning pot includes portions from all losing bets
- Your payout is calculated and auto-credited

**If you LOSE:**
- Your bet goes to the pot for winners
- No payout received
- Try again next round!

![Roulette Balance Update](https://github.com/user-attachments/assets/a7f00a40-f864-4974-90b7-21f516ddcb21)   
*Balance automatically updated after round completion*

**Step 6: Play Next Round**

After results:
1. Click **"Continue Playing"** button
2. New round starts automatically
3. Countdown begins for next betting phase
4. Place your next bet!

**View Game History**

![Roulette History](https://github.com/user-attachments/assets/997cd9d3-05c2-4cc7-8f9c-a252fcd0f2fd)   
*Game history showing your past roulette rounds*

Check your history to see:
- Past rounds you participated in
- Your bet type and amount
- Winning type
- Your winnings/losses
- Overall performance

**Tips:**
- Heads and Tails have equal chances (excluding crown)
- Crown is rare but offers 10x payout - high risk, high reward
- Bigger bets = bigger share of winning pot
- Watch other players' bets to gauge the pot
- Your payout also depends on how much others bet on the winning side
- The winning side is selected using provably fair randomization

**Payout Formula:**
```
If you bet on winning side:
Your Payout = (Total Pot × House Fee) × (Your Bet / Total Winning Side Bets)

House typically takes 5-10% fee
```

---

## Features

### Authentication & Account
- Wallet-based authentication
- Social login (Google, Discord, etc.)
- User profiles with avatars and levels
- Balance management
- Transaction history
- Client seed management for provably fair gaming

### Game Features
- **Real-time Multiplayer:** WebSocket-based live gameplay
- **Provably Fair:** All games use cryptographic verification
- **Responsive Design:** Play on desktop, tablet, or mobile
- **Live Chat:** Interact with other players
- **Game History:** Track all your past games
- **Leaderboards:** Compete with top players

### Security
- Secure WebSocket connections
- Client-side encryption
- Session management
- Anti-cheat mechanisms

---

## Technologies

This project uses:

- **Framework:** [Next.js 14](https://nextjs.org) with App Router
- **UI Library:** [HeroUI](https://heroui.com) (React components)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **State Management:** React Context API
- **Real-time:** WebSocket (Socket.io client)
- **Icons:** React Icons (Font Awesome 6)
- **Charts:** Custom canvas-based charts
- **TypeScript:** Full type safety
- **Font:** [Geist Font](https://vercel.com/font) by Vercel

---

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Next.js Tutorial](https://nextjs.org/learn) - Interactive Next.js tutorial
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework
- [HeroUI Components](https://heroui.com) - Modern React UI components

---

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Support

For support and questions:
- Check the [FAQ page](./docs/FAQ.md)
- Join our [Discord community](#)
- Contact support at support@spinx.com

---

## License

This project is proprietary software. All rights reserved.

---

**Happy Gaming! 🎰🎮💎**
