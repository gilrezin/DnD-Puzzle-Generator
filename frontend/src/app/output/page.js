import { ScrollText, Sword, PuzzleIcon as PuzzlePiece } from "lucide-react"

export default function DNDResultsPage() {
  return (
    <div className="min-h-screen bg-[url('/images/StoneTextureBright.jpg')] bg-fixed dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-600 dark:bg-red-800 p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">D&D Game Results</h1>
        </div>
        <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
          {/* Next Session */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold flex items-center mb-3 sm:mb-4 text-gray-800 dark:text-gray-200">
              <ScrollText className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Next Session
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-md text-gray-700 dark:text-gray-300">
              <p className="mb-1">
                <span className="font-semibold">Date:</span> March 1, 2025
              </p>
              <p className="mb-1">
                <span className="font-semibold">Location:</span> The Misty Mountains
              </p>
              <p>
                <span className="font-semibold">Objective:</span> Retrieve the ancient artifact from the dragon's lair
              </p>
            </div>
          </section>

          {/* Enemies */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold flex items-center mb-3 sm:mb-4 text-gray-800 dark:text-gray-200">
              <Sword className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Enemies
            </h2>
            <ul className="space-y-4">
              <li className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-md">
                <div className="flex flex-wrap justify-between items-center mb-2">
                  <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">Ancient Red Dragon</span>
                  <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full text-xs sm:text-sm mt-1 sm:mt-0">
                    Legendary
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-2 text-sm sm:text-base">
                  A colossal dragon with scales as red as flame and eyes that burn with ancient malice.
                </p>
                <div>
                  <h4 className="font-semibold mt-2 mb-1 text-sm sm:text-base text-gray-800 dark:text-gray-200">
                    Abilities:
                  </h4>
                  <ul className="list-disc list-inside">
                    <li className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      Fire Breath: Deals massive fire damage in a 90-foot cone
                    </li>
                    <li className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      Frightful Presence: Strikes fear into the hearts of nearby creatures
                    </li>
                    <li className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      Multiattack: Can make multiple devastating physical attacks per turn
                    </li>
                  </ul>
                </div>
              </li>
              <li className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-md">
                <div className="flex flex-wrap justify-between items-center mb-2">
                  <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">Goblin Horde</span>
                  <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full text-xs sm:text-sm mt-1 sm:mt-0">
                    Medium
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-2 text-sm sm:text-base">
                  A swarming mass of small, green-skinned creatures armed with crude weapons and wicked grins.
                </p>
                <div>
                  <h4 className="font-semibold mt-2 mb-1 text-sm sm:text-base text-gray-800 dark:text-gray-200">
                    Abilities:
                  </h4>
                  <ul className="list-disc list-inside">
                    <li className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      Overwhelming Numbers: Gains advantage on attacks when allies are nearby
                    </li>
                    <li className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      Nimble Escape: Can disengage or hide as a bonus action
                    </li>
                    <li className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      Surprise Attack: Deals extra damage when attacking a surprised creature
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </section>

          {/* Puzzles */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold flex items-center mb-3 sm:mb-4 text-gray-800 dark:text-gray-200">
              <PuzzlePiece className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Puzzles
            </h2>
            <ul className="space-y-4">
              <li className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-md">
                <div className="flex flex-wrap justify-between items-center mb-2">
                  <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    The Riddle of the Sphinx
                  </span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs sm:text-sm mt-1 sm:mt-0">
                    Riddle
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-2 text-sm sm:text-base">
                  A magical barrier blocks the path, guarded by an ancient sphinx who poses a challenging riddle.
                </p>
                <div>
                  <h4 className="font-semibold mt-2 mb-1 text-sm sm:text-base text-gray-800 dark:text-gray-200">
                    Solution:
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    The answer to the riddle is 'Time'. Players must decipher cryptic clues related to past, present,
                    and future.
                  </p>
                </div>
              </li>
              <li className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-md">
                <div className="flex flex-wrap justify-between items-center mb-2">
                  <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">The Shifting Maze</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs sm:text-sm mt-1 sm:mt-0">
                    Spatial
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-2 text-sm sm:text-base">
                  An enchanted labyrinth that constantly changes its configuration, challenging the party's spatial
                  awareness and teamwork.
                </p>
                <div>
                  <h4 className="font-semibold mt-2 mb-1 text-sm sm:text-base text-gray-800 dark:text-gray-200">
                    Solution:
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Players must work together to map the maze and identify the pattern of its shifts to reach the
                    center.
                  </p>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}