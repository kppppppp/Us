import { useState, useCallback } from 'react';
import { CASE_STUDIES } from '../constants/caseStudies';
import type { CaseStudy } from '../constants/caseStudies';

export function useActiveProject() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleActiveIndexChange = useCallback((index: number) => {
    // Prevent out-of-bound array accesses
    const clampedIndex = ((index % CASE_STUDIES.length) + CASE_STUDIES.length) % CASE_STUDIES.length;
    setActiveIndex(clampedIndex);
  }, []);

  const activeProject: CaseStudy = CASE_STUDIES[activeIndex];

  return {
    activeIndex,
    setActiveIndex: handleActiveIndexChange,
    activeProject,
    projects: CASE_STUDIES
  };
}
export type UseActiveProjectReturn = ReturnType<typeof useActiveProject>;
