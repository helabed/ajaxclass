require 'test_helper'

class CarModelsControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:car_models)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create car_model" do
    assert_difference('CarModel.count') do
      post :create, :car_model => { }
    end

    assert_redirected_to car_model_path(assigns(:car_model))
  end

  test "should show car_model" do
    get :show, :id => car_models(:one).to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => car_models(:one).to_param
    assert_response :success
  end

  test "should update car_model" do
    put :update, :id => car_models(:one).to_param, :car_model => { }
    assert_redirected_to car_model_path(assigns(:car_model))
  end

  test "should destroy car_model" do
    assert_difference('CarModel.count', -1) do
      delete :destroy, :id => car_models(:one).to_param
    end

    assert_redirected_to car_models_path
  end
end
