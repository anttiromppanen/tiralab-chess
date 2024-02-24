# Progress week six

This week was solely used for minimax with alpha bruning algorithm, and especially implementing the algorithm to the application. The algorithm now works on a basic level, which means
that sometimes it gives logical moves for AI opponent, but sometimes the moves are questionable. The algorithm itself can still be optimized on many ways, but it calculates moves and 
moves pieces for black on black's turn now. I took a deliberate decision to not put heavy focus on automated tests on new code written, because code was moving around so much,
and manual testing was more appropriate right now.

## Next week
Logic for check and checkmate is already in place, but first thing next week is to implement them into the AI gameplay. The minimax algo eats up quite a bit of memory right now, and it needs
to be optimized, so that more depth can be put into the decisions. Minimax algorithm has no automated tests at the moment, so after it is optimized to a reasonable level,
tests should be put in place. Other than that, otherwise the project is alright unless huge bugs show up.
