import { ScrollText, Sword, Anvil, PuzzleIcon as PuzzlePiece } from "lucide-react"

const items = {
    nextSession: { response : 'session response'},
    enemies: [ {name: 'Guy', equipment : ['sword', 'shield'], description : 'a guy'}, {name: 'Guy2', equipment : ['bow', 'arrow'], description : 'a guy'} ], 
    puzzles: [ {puzzleName: 'Name', puzzleDesc : 'description'}, { puzzleName : 'Name2', puzzleDesc : 'description'}]  ,
    enemies: [ {name: 'Guy', equipment : ['sword', 'shield'], description : 'a guy'}, {name: 'Guy2', equipment : ['bow', 'arrow'], description : 'a guy'} ]
}

export default function DNDResultsPage() {
  return (
    <div className="min-h-screen bg-[url('/images/StoneTextureBright.jpg')] bg-fixed dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-600 dark:bg-red-800 p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">D&D Game Results</h1>
        </div>
        <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
          {/* Next Session */}
          <div>
              <h2 className="text-xl sm:text-2xl font-semibold flex items-center mb-3 sm:mb-4 text-gray-800 dark:text-gray-200">
                <ScrollText className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                Next Session
              </h2>
              <div className="pl-8">{items.nextSession.response}</div>
          </div>

          {/* Enemies */}


            <h2 className="text-xl sm:text-2xl font-semibold flex items-center mb-3 sm:mb-4 text-gray-800 dark:text-gray-200">
              <Sword className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Enemies
            </h2>

            <div>
              <ul>
                {items.enemies.map((enemy, index) => (
                  <li key={index} className = "bg-gray-100 ">
                    
                    <div className="font-semibold text-gray-800 pl-4">{enemy.name}</div>
                    <div className="text-gray-600 pl-8">Equipment: </div>
                    <ul>
                      {enemy.equipment.map((item, index) => (
                        <li key={index}>
                          <div className="text-gray-600 pl-12">{item}</div>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="text-gray-600 pl-8">Description: {enemy.description}</div>
                  </li>
                ))}
              </ul>
            </div>

          {/* Puzzles */}

          <h2 className="text-xl sm:text-2xl font-semibold flex items-center mb-3 sm:mb-4 text-gray-800 dark:text-gray-200">
              <PuzzlePiece className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Puzzles
          </h2>

          <div>
            <ul>
              {items.puzzles.map((puzzle, index) => (
                <li key={puzzle.puzzleName} className="bg-gray-100">
                  <div className="font-semibold text-gray-800 pl-4">{puzzle.puzzleName}:</div>
                  <div className="text-gray-600 pl-8">{puzzle.puzzleDesc}</div>
                </li>
              ))}
            </ul>
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold flex items-center mb-3 sm:mb-4 text-gray-800 dark:text-gray-200">
              <Anvil className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
            Friendly NPCs
          </h2>

          <div>
              <ul>
                {items.enemies.map((enemy, index) => (
                  <li key={index} className = "bg-gray-100 ">
                    
                    <div className="font-semibold text-gray-800 pl-4">{enemy.name}</div>
                    <div className="text-gray-600 pl-8">Equipment: </div>
                    <ul>
                      {enemy.equipment.map((item, index) => (
                        <li key={index}>
                          <div className="text-gray-600 pl-12">{item}</div>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="text-gray-600 pl-8">Description: {enemy.description}</div>
                  </li>
                ))}
              </ul>
            </div>
        </div>
      </div>
    </div>
  )
}