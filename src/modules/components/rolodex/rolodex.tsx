import classNames from 'classnames';
import { animate, motion, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';

const cards = ['Card 1', 'Card 2', 'Card 3'];
const bgColors = ['bg-primary-400', 'bg-success-400', 'bg-warning-400'];

const SLOT_CONFIG = [
    { y: 0, scale: 1, rotX: 0, z: 10 },
    { y: -30, scale: Math.pow(0.92, 1), rotX: -10, z: 9 },
    { y: -60, scale: Math.pow(0.92, 2), rotX: -20, z: 8 },
];

export const Rolodex: React.FC = () => {
    const [order, setOrder] = useState([0, 1, 2]);
    const [dragging, setDragging] = useState<number | null>(null);
    const [dragUp, setDragUp] = useState(false);
    const [hovered, setHovered] = useState<boolean>(false);
    const dragY = useMotionValue(0);
    const TH = 50;

    // autoplay: rotate every 3s
    useEffect(() => {
        let id: number;
        if (dragging === null && !hovered) {
            id = window.setInterval(() => {
                setOrder((prev) => [...prev.slice(1), prev[0]]);
            }, 5000);
        }
        return () => {
            if (typeof id === 'number') {
                clearInterval(id);
            }
        };
    }, [dragging, hovered]);

    const idxOf = (i: number) => order.indexOf(i);

    const onDragStart = (i: number) => {
        // pause autoplay
        setDragging(i);
    };
    const onDrag = (_: unknown, info: { offset: { y: number } }) => setDragUp(info.offset.y < 0);

    const onDragEnd = (i: number, info: { offset: { y: number } }) => {
        const rel = idxOf(i);
        let next = [...order];
        if (rel === 0 && info.offset.y < -TH) next = [order[1], order[0], order[2]];
        else if (rel === 1 && info.offset.y > TH) next = [order[1], order[0], order[2]];
        else if (rel === 1 && info.offset.y < -TH) next = [order[0], order[2], order[1]];
        else if (rel === 2 && info.offset.y > TH) next = [order[2], order[0], order[1]];
        setOrder(next);

        // bounce or snap
        if (dragUp) {
            const bounceAmt = rel === 1 ? -40 : -20;
            animate(dragY, bounceAmt, { type: 'spring', stiffness: 300, damping: 30 }).then(() =>
                animate(dragY, 0, { type: 'spring', stiffness: 300, damping: 30 }),
            );
        } else {
            animate(dragY, 0, { type: 'spring', stiffness: 300, damping: 30 });
        }

        setDragging(null);
        setDragUp(false);
    };

    const frontCard = order[0];

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative flex h-[250px] flex-col items-center"
        >
            <div className="relative flex h-full w-[300px] items-center justify-center perspective-[800px]">
                {order.map((cardIdx, rel) => {
                    if (rel > 2) return null;

                    // determine preview slot while dragging
                    let displayRel = rel;
                    if (dragging !== null) {
                        const dRel = idxOf(dragging);
                        if (dragUp) {
                            if (dRel === 0) {
                                displayRel = rel === 0 ? 1 : rel === 1 ? 0 : rel;
                            } else if (dRel === 1) {
                                displayRel = rel === 1 ? 2 : rel === 2 ? 1 : rel;
                            }
                        } else {
                            if (dRel === 1) {
                                displayRel = rel === 1 ? 0 : rel === 0 ? 1 : rel;
                            } else if (dRel === 2) {
                                displayRel = rel === 2 ? 1 : rel === 1 ? 2 : rel;
                            }
                        }
                    }

                    const isDrag = dragging === cardIdx;
                    const origRel = idxOf(cardIdx);
                    const slotIndex = isDrag && dragUp && origRel === 1 ? 1 : displayRel;
                    const { y: slotY, scale: slotScale, rotX: slotRotX, z: slotZ } = SLOT_CONFIG[slotIndex];

                    // z-order: drag-down→top; drag-up→slot; else slot
                    const zIndex = isDrag ? (dragUp ? slotZ : 11) : slotZ;

                    // bounce on drag-up
                    const bounce = isDrag && dragUp ? (origRel === 1 ? -40 : -20) : 0;

                    // animation targets
                    const animY = isDrag ? (dragUp ? slotY + bounce : SLOT_CONFIG[0].y) : slotY;
                    const animScale = isDrag
                        ? dragUp && origRel === 1
                            ? slotScale * 0.95
                            : dragUp && origRel === 2
                              ? SLOT_CONFIG[1].scale * 0.95
                              : dragUp
                                ? slotScale
                                : 1
                        : slotScale;
                    const animRotX = isDrag
                        ? dragUp && origRel === 2
                            ? SLOT_CONFIG[1].rotX
                            : !dragUp
                              ? 0
                              : slotRotX
                        : slotRotX;

                    return (
                        <motion.div
                            key={cardIdx}
                            className={`absolute flex h-[200px] w-full cursor-pointer flex-col items-start justify-start rounded-xl border border-neutral-950 px-2 pt-1 shadow-lg ${bgColors[cardIdx]} `}
                            drag="y"
                            dragConstraints={{ top: 0, bottom: 0 }}
                            dragElastic={0.2}
                            onDragStart={() => onDragStart(cardIdx)}
                            onDrag={onDrag}
                            onDragEnd={(e, info) => onDragEnd(cardIdx, info)}
                            onClick={() => setOrder([cardIdx, ...order.filter((x) => x !== cardIdx)])}
                            style={{ zIndex }}
                            animate={{ y: animY, scale: animScale, rotateX: animRotX }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            layout
                        >
                            {cards[cardIdx]}
                        </motion.div>
                    );
                })}
            </div>
            <div className="mt-2 flex w-full justify-center gap-x-3">
                {cards.map((_, idx) => {
                    const isActive = idx === frontCard;
                    return (
                        <button
                            key={idx}
                            onClick={() => {
                                // bring that card to front
                                setOrder([idx, ...order.filter((i) => i !== idx)]);
                            }}
                            className={classNames(
                                'h-2 w-20 cursor-pointer rounded-xl transition-colors',
                                isActive ? 'bg-neutral-600' : 'bg-neutral-400',
                            )}
                        />
                    );
                })}
            </div>
        </div>
    );
};
