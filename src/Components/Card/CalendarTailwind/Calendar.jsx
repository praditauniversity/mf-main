import React from 'react'
import { Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon } from '@heroicons/react/outline'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import {
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isEqual,
    isSameDay,
    isSameMonth,
    isToday,
    parse,
    parseISO,
    startOfToday,
} from 'date-fns'
import { Fragment, useState } from 'react'
import FutureUpdateEditCalendar from '../../Modal/FutureUpdateModal/Edit & Cancel Calendar/FutureUpdateEditCalendar'
import FutureUpdateCancelCalendar from '../../Modal/FutureUpdateModal/Edit & Cancel Calendar/FutureUpdateCancelCalendar'

const meetings = [
    {
        id: 1,
        name: 'Leslie Alexander',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        startDatetime: '2023-01-11T13:00',
        endDatetime: '2023-01-11T14:30',
    },
    {
        id: 2,
        name: 'Michael Foster',
        imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        startDatetime: '2023-01-20T09:00',
        endDatetime: '2023-01-20T11:30',
    },
    {
        id: 3,
        name: 'Dries Vincent',
        imageUrl:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        startDatetime: '2023-01-20T17:00',
        endDatetime: '2023-01-20T18:30',
    },
    {
        id: 4,
        name: 'Leslie Alexander',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        startDatetime: '2023-02-09T13:00',
        endDatetime: '2023-02-09T14:30',
    },
    {
        id: 5,
        name: 'Michael Foster',
        imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        startDatetime: '2023-02-13T14:00',
        endDatetime: '2023-02-13T14:30',
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function Meeting({ meeting }) {
    let startDateTime = parseISO(meeting.startDatetime)
    let endDateTime = parseISO(meeting.endDatetime)

    return (
        <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
            <img
                src={meeting.imageUrl}
                alt=""
                className="flex-none w-10 h-10 rounded-full"
            />
            <div className="flex-auto">
                <p className="text-gray-900">{meeting.name}</p>
                <p className="mt-0.5">
                    <time dateTime={meeting.startDatetime}>
                        {format(startDateTime, 'h:mm a')}
                    </time>{' '}
                    -{' '}
                    <time dateTime={meeting.endDatetime}>
                        {format(endDateTime, 'h:mm a')}
                    </time>
                </p>
            </div>
            <Menu
                as="div"
                className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
            >
                <div>
                    <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
                        <span className="sr-only">Open options</span>
                        <DotsVerticalIcon className="w-6 h-6" aria-hidden="true" />
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                <FutureUpdateEditCalendar />
                            </Menu.Item>
                            <Menu.Item>
                                <FutureUpdateCancelCalendar />
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </li>
    )
}

let colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
]

const CalendarTailwind = () => {
    let today = startOfToday()
    let [selectedDay, setSelectedDay] = useState(today)
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

    let days = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
    })

    function previousMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    function nextMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    let selectedDayMeetings = meetings.filter((meeting) =>
        isSameDay(parseISO(meeting.startDatetime), selectedDay)
    )

    return (
        <div className="rounded-xl shadow-lg bg-white py-5 px-3 calendarapp">
            <div>
                <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
                    <div>
                        <div className='md:grid md:grid-cols-12 md:divide-y md:divide-gray-200'>
                            <div className='md:col-span-12 py-10'>
                                <div className="md:pr-0">
                                    <div className="flex items-center">
                                        <h2 className="flex-auto font-semibold text-gray-900">
                                            {format(firstDayCurrentMonth, 'MMMM yyyy')}
                                        </h2>
                                        <button
                                            type="button"
                                            onClick={previousMonth}
                                            className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                                        >
                                            <span className="sr-only">Previous month</span>
                                            <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                                        </button>
                                        <button
                                            onClick={nextMonth}
                                            type="button"
                                            className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                                        >
                                            <span className="sr-only">Next month</span>
                                            <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
                                        <div className='text-error-dark'>S</div>
                                        <div>M</div>
                                        <div>T</div>
                                        <div>W</div>
                                        <div>T</div>
                                        <div>F</div>
                                        <div>S</div>
                                    </div>
                                    <div className="grid grid-cols-7 mt-2 text-sm">
                                        {days.map((day, dayIdx) => (
                                            <div
                                                key={day.toString()}
                                                className={classNames(
                                                    dayIdx === 0 && colStartClasses[getDay(day)],
                                                    'py-1.5'
                                                )}
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedDay(day)}
                                                    className={classNames(
                                                        isEqual(day, selectedDay) && 'text-white',
                                                        !isEqual(day, selectedDay) &&
                                                        isToday(day) &&
                                                        'text-primary-800',
                                                        !isEqual(day, selectedDay) &&
                                                        !isToday(day) &&
                                                        isSameMonth(day, firstDayCurrentMonth) &&
                                                        'text-gray-900',
                                                        !isEqual(day, selectedDay) &&
                                                        !isToday(day) &&
                                                        !isSameMonth(day, firstDayCurrentMonth) &&
                                                        'text-gray-400',
                                                        isEqual(day, selectedDay) && isToday(day) && 'bg-primary-800',
                                                        isEqual(day, selectedDay) &&
                                                        !isToday(day) &&
                                                        'bg-gray-900', /* ini buat bg warna saat dia select hari lain */
                                                        !isEqual(day, selectedDay) && 'hover:bg-primary-light',
                                                        (isEqual(day, selectedDay) || isToday(day)) &&
                                                        'font-semibold',
                                                        'mx-auto flex h-8 w-8 items-center justify-center rounded-lg'
                                                    )}
                                                >
                                                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                                                        {format(day, 'd')}
                                                    </time>
                                                </button>

                                                <div className="w-1 h-1 mx-auto mt-1">
                                                    {meetings.some((meeting) =>
                                                        isSameDay(parseISO(meeting.startDatetime), day)
                                                    ) && (
                                                            <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                                                        )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='md:col-span-12 py-10'>
                                <section className="mt-12 md:mt-0 md:pl-4">
                                    <h2 className="font-semibold text-gray-900">
                                        Schedule for{' '}
                                        <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                                            {format(selectedDay, 'MMM dd, yyy')}
                                        </time>
                                    </h2>
                                    <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                                        {selectedDayMeetings.length > 0 ? (
                                            selectedDayMeetings.map((meeting) => (
                                                <Meeting meeting={meeting} key={meeting.id} />
                                            ))
                                        ) : (
                                            <p>No meetings for today.</p>
                                        )}
                                    </ol>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CalendarTailwind;
