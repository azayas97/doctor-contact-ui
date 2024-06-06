const getClassNames = (...classNames: any[]): string => {
  return (classNames.reduce((prev, className) => {
    if (className) return prev.concat(' ', className); 
    return prev;
  }) as string).replaceAll(',', ' ')
}

export {
  getClassNames
}
