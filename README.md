# Goal

To be able to search a repository of Javascript/Typescript code, report occurrences of a pattern, and then report individual code occurrences. 

# How this is different from an IDE-search

Fundamentally this repository contains different methods for exporting these search results. Further, the search functionality is enhanced by providing links to individual github code lines. 

# Technology stack

## Potential

* raycast script to capture output from different searches (list compatible ones)
* VSCode plugin to extend the typescript plugin, offering enhanced exporting of the reference search.
* Basic script to build an AST tree and report occurrences of pattern.


## Common across any implementation detail

* config
	* output directory
	* repository
	* repository token (read-only)
* available commands
	* export/report
	* search
* pandoc
	* for export/report pdf's, otherwise MD is only option.




# TO DO

---

# How to run

## RayCast script

#### Available export commands

* VSCode search results
* Github Search
* grep

#### Available search commands

* JS Script to search repository, builds AST.

#### How to run

1. Register script for raycast
2. Search repository using tool
3. Export via Raycast


## VsCode Plugin

1. install plugin via marketplace

