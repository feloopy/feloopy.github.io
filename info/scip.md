SCIP is a highly extensible solver and framework for combinatorial
decision problems such as MIP (Mixed-Integer Programming), MINLP (Mixed-Integer
Nonlinear Programming), and CIP (Constraint Integer Programs). It was created
by Tobias Achterberg, and development traces back to the early 2000s (the first
commit was on October 23, 2002, ~23 years ago).

It is modular and plugin-friendly, and the suite bundles
several focused optimization flavors: SoPlex, Sequential object-oriented
simPlex, is the linear programming solver backbone; ZIMPL is the compact
modeling language that writes .lp/.mps files; UG provides the parallelization
framework for branch-and-bound style solvers; GCG implements generic column
generation and branch-price-and-cut; PaPILO supplies parallel presolve routines
with multiprecision support. SoPlex moved to the Apache 2.0 license in late 2022,
and ZIMPL is distributed under LGPLv3.

Releases up to and including version 8.0.2 are distributed
under the ZIB Academic License, and from version 8.0.3, the full SCIP
Optimization Suite is published under the Apache License 2.0. That license
mapping makes it easier to use SCIP in permissively licensed projects from
8.0.3 onward.

According to Tobias Achterberg’s 20-year retrospective:
textbook-simplex work, two-watched-literals propagation, generalized conflict
analysis for infeasible LP relaxations, and experiments with history-based and
ML-informed branching were important seeds that shaped reliability branching
and many of SCIP’s heuristics and propagators.

SCIP also exposes bindings and solver interfaces such as
PySCIPOpt for Python and NLPI interfaces to nonlinear solvers such as Ipopt,
WORHP, and FilterSQP for MINLP work.
