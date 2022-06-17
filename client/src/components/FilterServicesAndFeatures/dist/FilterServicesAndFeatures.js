"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.FilterServicesAndFeatures = void 0;
// React Components
var react_1 = require("react");
// Custom Imports
var LoadSpinner_1 = require("../LoadSpinner/LoadSpinner");
// Custom Styles
require("./FilterServicesAndFeatures.css");
exports.FilterServicesAndFeatures = function (props) {
    var _a, _b;
    var _c = react_1.useState(true), isLoading = _c[0], setIsLoading = _c[1];
    //* Initialize Arrays for Selected Business Features and Services
    var _d = react_1.useState([]), filteredFeats = _d[0], setFilteredFeats = _d[1];
    var _e = react_1.useState([]), filteredServices = _e[0], setFilteredServices = _e[1];
    //* HandleChanges for the Selected Features and Services Checkboxes
    var onFeatChange = function (event) {
        var _a;
        var _b = event.target, name = _b.name, checked = _b.checked, id = _b.id;
        // console.log('id', id, 'checked', checked)
        // setFilteredFeats({ ...filteredFeats, [`${name} (${id})`]: checked })
        setFilteredFeats(__assign(__assign({}, filteredFeats), (_a = {}, _a["" + id] = checked, _a)));
    };
    // console.log('filteredFeats onChange', filteredFeats)
    var onServiceChange = function (event) {
        var _a;
        var _b = event.target, name = _b.name, checked = _b.checked, id = _b.id;
        // console.log('id', id, 'checked', checked)
        // setFilteredServices({ ...filteredServices, [`${name} (${id})`]: checked })
        setFilteredServices(__assign(__assign({}, filteredServices), (_a = {}, _a["" + id] = checked, _a)));
    };
    // console.log('filteredServices onChange', filteredServices)
    //* Monitor changes to the filtered Features and Services arrays. If there are changes send the data to the `BusinessList` Parent component
    react_1.useEffect(function () {
        if (props.onFeatChange) {
            props.onFeatChange(filteredFeats);
            // console.log('filteredFeats useEffect changes', filteredFeats)
        }
        if (props.onServiceChange) {
            props.onServiceChange(filteredServices);
            // console.log('filteredServices useEffect changes', filteredServices)
        }
    }, [filteredFeats, filteredServices]);
    return (React.createElement(React.Fragment, null, !props.loading ? (React.createElement(React.Fragment, null,
        React.createElement("section", { className: 'Filters' },
            React.createElement("h4", { className: 'sidebar-hed' },
                React.createElement("label", { htmlFor: 'features' }, "Features")),
            React.createElement("div", { className: 'Filters-FormGroup features' }, (_a = props.featuresArr) === null || _a === void 0 ? void 0 : _a.map(function (feature, id, index) { return (React.createElement("h5", { key: feature + "_" + index, style: {
                    display: 'flex',
                    marginTop: '10px',
                    marginBottom: '5px'
                } },
                React.createElement("input", { type: 'checkbox', name: "feature-" + feature[0], id: feature[1], defaultChecked: feature[2].isChecked, value: id, onChange: onFeatChange }),
                React.createElement("label", { htmlFor: feature[1] }, feature[0]))
            // </div>
            ); })),
            React.createElement("h4", { className: 'sidebar-hed' },
                React.createElement("label", { htmlFor: 'services' }, "Services")),
            React.createElement("div", { className: 'Filters-FormGroup services' }, (_b = props.servicesArr) === null || _b === void 0 ? void 0 : _b.map(function (service, id, index) { return (React.createElement("h5", { key: service + "_" + index, style: {
                    display: 'flex',
                    marginTop: '10px',
                    marginBottom: '5px'
                } },
                React.createElement("input", { type: 'checkbox', name: "service-" + service[0], id: service[1], defaultChecked: service[2].isChecked, value: id, onChange: onServiceChange }),
                React.createElement("label", { className: 'Filters-FormCheckLabel', htmlFor: service[1] }, service[0]))); }))),
        React.createElement("div", { className: 'Filters-buttons' },
            React.createElement("button", { className: 'btn--btn-primary filter', onClick: props.handleResetFilter }, "Filter Results"),
            React.createElement("button", { className: 'btn--btn-primary filter', onClick: props.handleResetFilter }, "reset Filters")))) : (React.createElement("section", { className: 'Filters-Container' }, isLoading && React.createElement(LoadSpinner_1.LoadSpinner, null)))));
};
