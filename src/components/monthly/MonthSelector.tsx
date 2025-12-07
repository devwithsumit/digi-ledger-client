import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getMonthLabel, getMonthsForSelector, getNextMonth, getPreviousMonth } from '@/utils/monthHelpers';

interface MonthSelectorProps {
    selected: { year: number; month: number };
    onChange: (year: number, month: number) => void;
}

export function MonthSelector({ selected, onChange }: MonthSelectorProps) {
    const months = getMonthsForSelector();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragState, setDragState] = useState({ startX: 0, scrollLeft: 0 });

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const selectedIndex = months.findIndex((m) => m.year === selected.year && m.month === selected.month);
        if (selectedIndex >= 0) {
            const selectedElement = container.children[selectedIndex] as HTMLElement;
            if (selectedElement) {
                const scrollPosition = selectedElement.offsetLeft - container.clientWidth / 2 + selectedElement.offsetWidth / 2;
                container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
            }
        }
    }, [selected, months]);

    const handlePrevious = () => {
        const prev = getPreviousMonth(selected.year, selected.month);
        onChange(prev.year, prev.month);
    };

    const handleNext = () => {
        const next = getNextMonth(selected.year, selected.month);
        onChange(next.year, next.month);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        const container = scrollContainerRef.current;
        if (!container) return;
        setIsDragging(true);
        setDragState({ startX: e.pageX - container.offsetLeft, scrollLeft: container.scrollLeft });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const container = scrollContainerRef.current;
        if (!container) return;
        container.scrollLeft = dragState.scrollLeft - (e.pageX - container.offsetLeft - dragState.startX) * 2;
    };

    const prevMonth = getPreviousMonth(selected.year, selected.month);
    const nextMonth = getNextMonth(selected.year, selected.month);
    const canGoPrevious = months.some((m) => m.year === prevMonth.year && m.month === prevMonth.month);
    const canGoNext = months.some((m) => m.year === nextMonth.year && m.month === nextMonth.month);

    return (
        <div className="relative">
            {canGoPrevious && (
                <button onClick={handlePrevious} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-slate-50 transition-colors" aria-label="Previous month">
                    <ChevronLeft className="w-5 h-5 text-slate-700" />
                </button>
            )}
            <div
                ref={scrollContainerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                className={`flex gap-2 overflow-y-visible overflow-x-auto scrollbar-hide py-2 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} select-none snap-x snap-mandatory`}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {months.map((monthItem) => {
                    const isSelected = monthItem.year === selected.year && monthItem.month === selected.month;
                    return (
                        <div key={`${monthItem.year}-${monthItem.month}`} className="shrink-0 w-[50%] sm:w-[45%] md:w-[40%] snap-center">
                            <Button type="button"
                                variant={isSelected ? 'primary' : 'tertiary'}
                                onClick={() => onChange(monthItem.year, monthItem.month)}
                                className={`w-full ${isSelected && '-translate-y-1'}`}
                            >
                                {`${getMonthLabel(monthItem.month)} ${monthItem.year}`}
                            </Button>
                        </div>
                    );
                })}
            </div>
            {canGoNext && (
                <button onClick={handleNext} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-slate-50 transition-colors" aria-label="Next month">
                    <ChevronRight className="w-5 h-5 text-slate-700" />
                </button>
            )}
        </div>
    );
}
