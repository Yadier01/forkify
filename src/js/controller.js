import * as modal from './modal';
import recipeView from './views/recipeView';
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpiner();
    await modal.loadRecipe(id);
    let { recipe } = modal.state;

    recipeView.render(modal.state.recipe);
  } catch (error) {
    console.error(error);
  }
};

showRecipe();
['haschange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));
