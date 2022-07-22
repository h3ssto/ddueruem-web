import {GroupConstraintItem} from "@/classes/Constraint/GroupConstraintItem";

export class Conjunction extends GroupConstraintItem {
    constructor(items) {
        super(items, '∧');
    }
}
