export enum Muscles {
  abductors = 'abductors',
  abs = 'abs',
  adductors = 'adductors',
  biceps = 'biceps',
  calves = 'calves',
  cardiovascularSystem = 'cardiovascular system',
  delts = 'delts',
  forearms = 'forearms',
  glutes = 'glutes',
  hamstrings = 'hamstrings',
  lats = 'lats',
  levatorScapulae = 'levator scapulae',
  pectorals = 'pectorals',
  quads = 'quads',
  serratusAnterior = 'serratus anterior',
  spine = 'spine',
  traps = 'traps',
  triceps = 'triceps',
  upperBack = 'upper back',
}

export interface MuscleItem {
  label: string;
  value: Muscles;
}
const musclesValues = Object.values(Muscles);
export const musclesList: MuscleItem[] = Object.keys(Muscles).map(
  (item, index) => ({
    label: item,
    value: musclesValues[index],
  }),
);
