import { useState, useEffect } from 'react';
import { Strategy } from '../types/strategy';
import { enqueueSnackbar } from 'notistack';

export const useStrategies = () => {
  const [strategies, setStrategies] = useState<Strategy[]>([]);

  useEffect(() => {
    const savedStrategies = localStorage.getItem('trading-strategies');
    if (savedStrategies) {
      setStrategies(JSON.parse(savedStrategies));
    }
  }, []);

  const getStrategy = (id: string) => {
    return strategies.find(strategy => strategy.id === id);
  };


  const saveStrategy = (strategy: Partial<Strategy>) => {
    const newStrategy: Strategy = {
      id: strategy.id || crypto.randomUUID(),
      name: strategy.name || 'Untitled Strategy',
      created: strategy.created || new Date().toISOString(),
      lastModified: new Date().toISOString(),
      status: strategy.status || 'draft',
      type: strategy.type || 'custom',
      configuration: strategy.configuration || {
        scanner: null,
        buyTrigger: null,
        sellTrigger: null,
        simulation: null
      },
      ...strategy
    };

    {/** TODO: if needed */}
    // setStrategies(prev => {
    //   const updated = [...prev, newStrategy];
    //   localStorage.setItem('trading-strategies', JSON.stringify(updated));
    //   return updated;
    // });

    // enqueueSnackbar('Strategy saved successfully!', { 
    //   variant: 'success',
    //   autoHideDuration: 3000
    // });

    
    setStrategies(prev => {
      const updated = strategy.id 
        ? prev.map(s => s.id === strategy.id ? newStrategy : s)
        : [...prev, newStrategy];
      localStorage.setItem('trading-strategies', JSON.stringify(updated));
      return updated;
    });

    enqueueSnackbar(strategy.id ? 'Strategy updated successfully!' : 'Strategy saved successfully!', { 
      variant: 'success',
      autoHideDuration: 3000
    });

    return newStrategy;
  };

  const updateStrategy = (id: string, updates: Partial<Strategy>) => {
    setStrategies(prev => {
      const updated = prev.map(strategy => 
        strategy.id === id 
          ? { ...strategy, ...updates, lastModified: new Date().toISOString() }
          : strategy
      );
      localStorage.setItem('trading-strategies', JSON.stringify(updated));
      return updated;
    });

    enqueueSnackbar('Strategy updated successfully!', { 
      variant: 'success',
      autoHideDuration: 3000
    });
  };

  const deleteStrategy = (id: string) => {
    setStrategies(prev => {
      const updated = prev.filter(strategy => strategy.id !== id);
      localStorage.setItem('trading-strategies', JSON.stringify(updated));
      return updated;
    });

    enqueueSnackbar('Strategy deleted', { 
      variant: 'info',
      autoHideDuration: 3000
    });
  };

  return {
    strategies,
    saveStrategy,
    updateStrategy,
    deleteStrategy,
    getStrategy
  };
};