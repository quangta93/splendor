# Splendor

## Turn Requirements

- Player should receive visual cue that his/her turn is on.
- Player should be offered 3 options
  - Take tokens
    - Player should be stopped from taking more than 2 similar tokens.
    - Player should be stopped from taking 2 similar tokens if that token count is <= 3.
    - Player should be offered to drop tokens if total num of tokens > 10.
  - Reserve
    - Player should not received gold token, if stash is empty.
    - Player should be offered to drop 1 token if current total num of tokens == 10.
  - Buy
    - Player should be asked to select paying tokens.
- Player should confirm selection + perform action + end turn by a single click.
