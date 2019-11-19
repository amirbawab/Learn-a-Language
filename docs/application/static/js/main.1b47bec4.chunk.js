(this.webpackJsonpapplication=this.webpackJsonpapplication||[]).push([[0],{17:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(6),s=n.n(o);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var i=n(1),c=n(2),l=n(4),u=n(3),d=n(5),m=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return a.createElement("div",{className:"d-sm-flex align-items-center justify-content-between mb-4"},a.createElement("h1",{className:"h3 mb-0 text-gray-800 col-lg-12"},this.props.children))}}]),t}(a.Component),h=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e="fa-2x text-gray-300 ",t=void 0;return this.props.icon&&(e+=this.props.icon,t=a.createElement("li",{className:e})),a.createElement("div",{className:"col-xl-4 col-md-6 mb-4"},a.createElement("div",{className:"card border-left-"+this.props.theme+" shadow h-100 py-2"},a.createElement("div",{className:"card-body"},a.createElement("div",{className:"row no-gutters align-items-center"},a.createElement("div",{className:"col mr-2"},a.createElement("div",{className:"text-xs font-weight-bold text-"+this.props.theme+" text-uppercase mb-1"},this.props.title),a.createElement("div",{className:"h5 mb-0 font-weight-bold text-gray-800"},this.props.children)),a.createElement("div",{className:"col-auto"},t)))))}}]),t}(a.Component),_=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=void 0;return this.props.title&&(e=a.createElement("div",{className:"card-header py-3"},a.createElement("h6",{className:"m-0 font-weight-bold text-"+this.props.color},this.props.title))),a.createElement("div",{className:"card shadow mb-4"},e,a.createElement("div",{className:"card-body"},this.props.children))}}]),t}(a.Component);_.defaultProps={color:"primary"};var f=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return a.createElement("div",{className:"m-2"},a.createElement(m,null,"Welcome"),a.createElement("div",{className:"row"},a.createElement("div",{className:"col-lg-12"},a.createElement(_,null,a.createElement("h5",null,'Click on "New Word" or select an existing one')))))}}]),t}(a.Component),p=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"click_button",value:function(e){this.props.on_click()||e.preventDefault()}},{key:"render",value:function(){var e=this,t="btn btn-"+this.props.theme+" btn-icon-split";return this.props.extra_class&&(t+=" "+this.props.extra_class),a.createElement("a",{href:"#/",onClick:function(t){return e.click_button(t)},className:t},a.createElement("span",{className:"icon text-white-50"},a.createElement("i",{className:this.props.icon})),a.createElement("span",{className:"text"},this.props.children))}}]),t}(a.Component),v=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e="btn btn-"+this.props.theme;return this.props.extra_class&&(e+=" "+this.props.extra_class),a.createElement("button",{className:e,onClick:this.props.on_click},this.props.children)}}]),t}(a.Component),w=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return a.createElement(a.Fragment,null,this.props.children,a.createElement(v,{theme:"primary",extra_class:"mr-2",on_click:this.props.on_ok},this.props.ok_name),a.createElement(v,{theme:"secondary",on_click:this.props.on_cancel},this.props.cancel_name))}}]),t}(a.Component),y=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"value",value:function(){return this.refs.input.value}},{key:"render",value:function(){return a.createElement("div",{className:"form-group"},a.createElement("label",null,this.props.label),a.createElement("input",{type:"text",className:"form-control",ref:"input",defaultValue:this.props.text}))}}]),t}(a.Component),g=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={form_hidden:!0},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"set_form_hidden",value:function(e){return this.setState({form_hidden:e}),!1}},{key:"add_pronunciation",value:function(){var e=this.refs.language,t=this.refs.sound;this.props.on_add(e.value(),t.value()),this.set_form_hidden(!0)}},{key:"delete_pronunciation",value:function(e,t){e.preventDefault(),this.props.on_delete(t)}},{key:"render",value:function(){var e=this,t=void 0,n=function(){},r=void 0;return this.props.read_only||(this.state.form_hidden||(t=a.createElement("div",{className:"row"},a.createElement("div",{className:"col-lg-12"},a.createElement(_,null,a.createElement(w,{ok_name:"Add",cancel_name:"Close",on_ok:function(){return e.add_pronunciation()},on_cancel:function(){return e.set_form_hidden(!0)}},a.createElement(y,{ref:"language",label:"Language"}),a.createElement(y,{ref:"sound",label:"Sound"})))))),n=function(t){return a.createElement("a",{href:"#/",onClick:function(n){e.delete_pronunciation(n,t)}},a.createElement("div",{className:"text-xs font-weight-bold text-danger text-uppercase mt-2"},"DELETE"))},r=a.createElement("div",{className:"row"},a.createElement("div",{className:"col-xl-4 col-md-6 mb-4"},a.createElement(p,{theme:"success",icon:"fas fa-plus-square",on_click:function(){return e.set_form_hidden(!1)}},"Add Pronunciation")))),a.createElement("div",null,a.createElement("div",{className:"row"},this.props.data.map((function(e,t){return a.createElement(h,{theme:"success",key:t,title:e.get_language()+" Pronunciation",icon:"fas fa-microphone-alt"},e.get_sound(),n(t))}))),r,t)}}]),t}(a.Component),E=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).pronunciation_form_hidden=[],n.state={sentence_form_hidden:!0,example:{}},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"set_sentence_form_hidden",value:function(e){return this.setState({sentence_form_hidden:e}),!1}},{key:"set_pronunciation_form_hidden",value:function(e,t,n){null!==e&&e.preventDefault(),this.pronunciation_form_hidden[t]=n,this.setState(this.state)}},{key:"add_example",value:function(){var e=this.refs.sentence;return this.props.on_add(e.value()),this.set_sentence_form_hidden(!0),!1}},{key:"delete_example",value:function(e,t){e.preventDefault(),this.props.on_delete(t)}},{key:"add_example_sound",value:function(e){var t=this.refs["language_"+e],n=this.refs["sound_"+e];this.props.data[e].add_sound(t.value(),n.value()),this.props.on_example_update(),this.set_pronunciation_form_hidden(null,e,!0)}},{key:"delete_example_sound",value:function(e,t,n){e.preventDefault(),this.props.data[t].delete_sound(n),this.props.on_example_update()}},{key:"render",value:function(){var e=this,t=void 0,n=void 0,r=function(){},o=function(){},s=function(){},i=function(){},c=void 0;return this.props.read_only||(this.state.sentence_form_hidden||(t=a.createElement("div",{className:"row"},a.createElement("div",{className:"col-lg-12"},a.createElement(_,null,a.createElement(w,{ok_name:"Add",cancel_name:"Close",on_ok:function(){return e.add_example()},on_cancel:function(){return e.set_sentence_form_hidden(!0)}},a.createElement(y,{ref:"sentence",label:"Sentence"})))))),o=function(t){return e.pronunciation_form_hidden[t]||t>=e.pronunciation_form_hidden.length?a.createElement(a.Fragment,null):a.createElement(w,{ok_name:"Add",cancel_name:"Close",on_ok:function(){return e.add_example_sound(t)},on_cancel:function(){return e.set_pronunciation_form_hidden(null,t,!0)}},a.createElement(y,{ref:"language_"+t,label:"Language"}),a.createElement(y,{ref:"sound_"+t,label:"Sound"}))},s=function(t){return a.createElement("a",{href:"#/",onClick:function(n){return e.set_pronunciation_form_hidden(n,t,!1)}},a.createElement("i",{className:"fas fa-plus-square"})," Add Pronunciation")},i=function(t,n){return a.createElement("a",{href:"#/",onClick:function(a){e.delete_example_sound(a,t,n)}},a.createElement("span",{className:"text-danger mr-2"},"[Delete]"))},r=function(t){return a.createElement("a",{href:"#/",onClick:function(n){e.delete_example(n,t)}},a.createElement("div",{className:"text-xs font-weight-bold text-danger text-uppercase mt-2"},"DELETE EXAMPLE"))},n=a.createElement("div",{className:"row"},a.createElement("div",{className:"col-xl-4 col-md-6 mb-4"},a.createElement(p,{theme:"primary",icon:"fas fa-plus-square",on_click:function(){return e.set_sentence_form_hidden(!1)}},"Add Example")))),this.props.data.length>0&&(c=a.createElement("div",{className:"row"},a.createElement("div",{className:"col-lg-12"},a.createElement(_,{title:"Examples"},this.props.data.map((function(e,t){return a.createElement("div",{key:t},a.createElement("div",null,e.get_sentence()),a.createElement("div",null,e.get_sounds().map((function(e,n){return a.createElement("div",{key:n},a.createElement("span",{className:"text-primary mr-2"},"[",e.get_language()," Pronunciation]"),i(t,n),a.createElement("span",null,e.get_sound()))}))),s(t),o(t),r(t),a.createElement("div",{className:"border-top my-3"}))})))))),a.createElement("div",null,c,n,t)}}]),t}(a.Component),k=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={form_hidden:!0},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"set_form_hidden",value:function(e){return this.setState({form_hidden:e}),!1}},{key:"add_native",value:function(){var e=this.refs.native_form;this.props.on_add(e.value()),this.set_form_hidden(!0)}},{key:"delete_native",value:function(e,t){e.preventDefault(),this.props.on_delete(t)}},{key:"on_word_select",value:function(e,t){e.preventDefault(),this.props.on_word_select(t)}},{key:"resolve_keys",value:function(e){for(var t=this,n=/(#\w{32})/g,r=void 0,o=[],s=a.createElement(a.Fragment,null,e);r=n.exec(e);)o.push(r[0].slice(1));if(o.length>0){var i=this.props.on_resolve_keys(o),c="";i.forEach((function(e,t){0!==c.length&&(c+="|"),c+="#"+t}));var l=e.split(new RegExp("("+c+")","g"));s=a.createElement(a.Fragment,null,l.map((function(e,n){var r;if(e.startsWith("#")&&i.has(r=e.slice(1))){var o=String(i.get(r));return a.createElement("a",{key:n,onClick:function(e){return t.on_word_select(e,o)},href:"#/"},o)}return a.createElement(a.Fragment,{key:n},e)})))}return a.createElement(a.Fragment,null,s)}},{key:"render",value:function(){var e=this,t=void 0,n=function(){},r=void 0;return this.props.read_only||(this.state.form_hidden||(t=a.createElement("div",{className:"row"},a.createElement("div",{className:"col-lg-12"},a.createElement(_,null,a.createElement(w,{ok_name:"Add",cancel_name:"Close",on_ok:function(){return e.add_native()},on_cancel:function(){return e.set_form_hidden(!0)}},a.createElement(y,{ref:"native_form",label:"Native Form"})))))),n=function(t){return a.createElement("a",{href:"#/",onClick:function(n){e.delete_native(n,t)}},a.createElement("div",{className:"text-xs font-weight-bold text-danger text-uppercase mt-2"},"DELETE"))},r=a.createElement("div",{className:"row"},a.createElement("div",{className:"col-xl-4 col-md-6 mb-4"},a.createElement(p,{theme:"info",icon:"fas fa-plus-square",on_click:function(){return e.set_form_hidden(!1)}},"Add Native Form")))),a.createElement("div",null,a.createElement("div",{className:"row"},this.props.data.map((function(t,r){return a.createElement(h,{key:r,theme:"info",title:"Native form",icon:"fas fa-language"},e.resolve_keys(t),n(r))}))),r,t)}}]),t}(a.Component),b=function(){function e(t,n){Object(i.a)(this,e),this.language=t,this.sound=n}return Object(c.a)(e,[{key:"get_language",value:function(){return this.language}},{key:"get_sound",value:function(){return this.sound}},{key:"to_json",value:function(){return{language:this.language,sound:this.sound}}}]),e}(),x=function(){function e(t){Object(i.a)(this,e),this.sentence=t,this.sounds=[]}return Object(c.a)(e,[{key:"get_sentence",value:function(){return this.sentence}},{key:"add_sound",value:function(e,t){this.sounds.push(new b(e,t))}},{key:"delete_sound",value:function(e){this.sounds.splice(e,1)}},{key:"get_sounds",value:function(){return this.sounds}},{key:"to_json",value:function(){var e={};return e.sentence=this.sentence,e.pronunciation=[],this.sounds.forEach((function(t){e.pronunciation.push(t.to_json())})),e}}]),e}(),N=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={word:n.props.word.clone(),copy_form_hidden:!0},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"set_copy_form_hidden",value:function(e){return this.setState({copy_form_hidden:e}),!1}},{key:"undo_changes",value:function(){return this.setState({word:this.props.word.clone()}),this.props.on_undo(this.state.word),!1}},{key:"update_word",value:function(){this.setState(this.state),this.props.on_edit(this.state.word)}},{key:"copy_word",value:function(){var e=this.refs.copy_word,t=this.state.word.clone();t.set_word(e.value()),this.props.on_copy_word(t),this.set_copy_form_hidden(!0)}},{key:"add_native_handler",value:function(e){this.state.word.add_native(e),this.update_word()}},{key:"delete_native_handler",value:function(e){this.state.word.delete_native(e),this.update_word()}},{key:"add_pronunciation_handler",value:function(e,t){this.state.word.add_pronunciation(e,t),this.update_word()}},{key:"delete_pronunciation_handler",value:function(e){this.state.word.delete_pronunciation(e),this.update_word()}},{key:"add_example_handler",value:function(e){var t=new x(e);this.state.word.add_example(t),this.update_word()}},{key:"delete_example_handler",value:function(e){this.state.word.delete_example(e),this.update_word()}},{key:"update_example_handler",value:function(){this.update_word()}},{key:"render",value:function(){var e=this,t=void 0;this.state.copy_form_hidden||this.props.read_only||(t=a.createElement("div",{className:"row"},a.createElement("div",{className:"col-lg-12"},a.createElement(_,null,a.createElement(w,{ok_name:"Copy",cancel_name:"Close",on_ok:function(){return e.copy_word()},on_cancel:function(){return e.set_copy_form_hidden(!0)}},a.createElement(y,{ref:"copy_word",label:"Copy Word"}))))));var n=void 0,r=void 0,o=void 0;return this.props.read_only||(n=a.createElement(p,{theme:"secondary",extra_class:"btn-sm float-right",icon:"far fa-copy",on_click:function(){return e.set_copy_form_hidden(!1)}},"Copy Word"),r=a.createElement(p,{theme:"danger",extra_class:"btn-sm float-right mr-2",icon:"far fa-trash-alt",on_click:function(){return e.undo_changes()}},"Undo Changes"),o=a.createElement("div",{className:"alert alert-warning",role:"alert"},'Click "Delete" to remove the word',a.createElement("button",{className:"btn btn-danger btn-sm float-right ml-2",onClick:function(){e.props.on_delete(e.state.word)}},"Delete"))),a.createElement("div",{className:"m-2"},a.createElement(m,null,a.createElement("div",null,a.createElement("i",{className:"far fa-file-word"})," ",a.createElement("b",null,this.state.word.get_word()),n,r),a.createElement("div",null,a.createElement("small",{style:{fontSize:15},className:"text-secondary"},a.createElement("em",null,"key: ",this.state.word.get_md5())))),t,a.createElement(k,{read_only:this.props.read_only,on_add:function(t){return e.add_native_handler(t)},on_delete:function(t){return e.delete_native_handler(t)},on_resolve_keys:this.props.on_resolve_keys,on_word_select:this.props.on_word_select,data:this.state.word.get_natives()}),a.createElement(g,{read_only:this.props.read_only,on_add:function(t,n){return e.add_pronunciation_handler(t,n)},on_delete:function(t){return e.delete_pronunciation_handler(t)},data:this.state.word.get_pronunciations()}),a.createElement(E,{read_only:this.props.read_only,on_add:function(t){return e.add_example_handler(t)},on_delete:function(t){return e.delete_example_handler(t)},on_example_update:function(){return e.update_example_handler()},data:this.state.word.get_examples()}),o)}}]),t}(a.Component),j=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={new_word_form_hidden:!0,server_form_hidden:!0,search_text:"",server_url_text:"http://localhost",server_port_text:"3001"},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"set_new_word_form_hidden",value:function(e,t){null!==e&&e.preventDefault(),this.setState({new_word_form_hidden:t})}},{key:"set_server_form_hidden",value:function(e,t){null!==e&&e.preventDefault(),this.setState({server_form_hidden:t})}},{key:"flashcard_mode",value:function(e){e.preventDefault(),this.props.on_flashcard()}},{key:"word_select",value:function(e,t){e.preventDefault(),this.props.on_word_select(t.get_word())}},{key:"on_new_word",value:function(){var e=this.refs.new_word;this.props.on_new_word(e.value()),this.set_new_word_form_hidden(null,!0)}},{key:"on_search_change",value:function(){var e=this.refs.search;this.setState({search_text:e.value})}},{key:"on_server_update",value:function(){var e=this.refs.url,t=this.refs.port;this.setState({server_url_text:e.value(),server_port_text:t.value()}),this.props.on_server_update(e.value(),t.value())}},{key:"search_includes",value:function(e){var t=e.get_word(),n=this.state.search_text;if(n.length>t.length)return!1;n=n.toLowerCase();for(var a=0,r=0;a<n.length&&r<t.length;)n[a]===t[r]&&a++,r++;return a===n.length}},{key:"render",value:function(){var e=this,t=void 0;this.state.new_word_form_hidden||this.props.read_only||(t=a.createElement("div",{className:"small col-md-12 text-white"},a.createElement(w,{ok_name:"Add",cancel_name:"Close",on_ok:function(){return e.on_new_word()},on_cancel:function(){return e.set_new_word_form_hidden(null,!0)}},a.createElement(y,{ref:"new_word",label:"Word"}))));var n=void 0;this.props.read_only||(n=a.createElement(a.Fragment,null,a.createElement("hr",{className:"sidebar-divider my-0"}),a.createElement("li",{className:"nav-item"},a.createElement("a",{className:"nav-link",href:"#/",onClick:function(t){e.set_new_word_form_hidden(t,!1)}},a.createElement("i",{className:"fas fa-plus-square"})," New Word"))));var r=void 0;return this.state.server_form_hidden||(r=a.createElement("div",{className:"small col-md-12 text-white"},a.createElement(w,{ok_name:"Update",cancel_name:"Close",on_ok:function(){return e.on_server_update()},on_cancel:function(){return e.set_server_form_hidden(null,!0)}},a.createElement(y,{ref:"url",label:"URL",text:this.state.server_url_text}),a.createElement(y,{ref:"port",label:"Port",text:this.state.server_port_text})))),a.createElement("div",null,a.createElement("form",{className:"d-none d-sm-inline-block form-inline mr-md-3 ml-md-3 my-2 my-md-0 mw-100 navbar-search",onSubmit:function(e){return e.preventDefault()}},a.createElement("div",{className:"input-group"},a.createElement("input",{type:"text",ref:"search",value:this.state.search_text,className:"form-control bg-light border-0 small",onChange:function(){return e.on_search_change()},placeholder:"Search for a word"}),a.createElement("div",{className:"input-group-append"},a.createElement("button",{className:"btn btn-warning"},a.createElement("i",{className:"fas fa-search fa-sm"}))))),a.createElement("hr",{className:"sidebar-divider my-0"}),a.createElement("li",{className:"nav-item"},a.createElement("a",{className:"nav-link",href:"#/",onClick:function(t){e.set_server_form_hidden(t,!1)}},a.createElement("i",{className:"fas fa-server"})," Server")),r,a.createElement("hr",{className:"sidebar-divider my-0"}),a.createElement("li",{className:"nav-item"},a.createElement("a",{className:"nav-link",href:"#/",onClick:function(t){e.flashcard_mode(t)}},a.createElement("i",{className:"fas fa-comment-alt"})," Flashcard ",a.createElement("small",null,a.createElement("em",null,"(",this.props.words.length,")")))),n,t,a.createElement("hr",{className:"sidebar-divider my-0"}),a.createElement("div",{style:{height:"350px"}},a.createElement("div",{className:"overflow-auto h-100 d-inline-block"},this.props.words.map((function(t,n){return a.createElement(a.Fragment,{key:n},e.search_includes(t)?a.createElement("li",{className:"nav-item"},a.createElement("a",{className:"nav-link",href:"#/",onClick:function(n){e.word_select(n,t)}},t.get_word())):void 0)})))))}}]),t}(a.Component),O=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).index=-1,n.state={word:null,hide_native:!0,hide_pronunciation:!0,hide_example:!0},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"new_word",value:function(e){this.setState({word:e,hide_native:!0,hide_pronunciation:!0,hide_example:!0})}},{key:"next",value:function(){var e=this;return this.props.words_keys.length>0&&(this.index=(this.index+1)%this.props.words_keys.length,console.log(this.index),this.props.on_show_word(this.props.words_keys[this.index],(function(t){e.new_word(t)}))),!1}},{key:"previous",value:function(){var e=this;return this.props.words_keys.length>0&&(this.index=(this.index+(this.props.words_keys.length-1))%this.props.words_keys.length,console.log(this.index),this.props.on_show_word(this.props.words_keys[this.index],(function(t){e.new_word(t)}))),!1}},{key:"show_native",value:function(){return this.setState({hide_native:!1}),!1}},{key:"show_pronunciation",value:function(){return this.setState({hide_pronunciation:!1}),!1}},{key:"show_example",value:function(){return this.setState({hide_example:!1}),!1}},{key:"render",value:function(){var e=this,t="",n=void 0;if(null===this.state.word)t="disabled",n=a.createElement("div",{className:"row"},a.createElement("div",{className:"col-lg-12"},a.createElement(_,null,a.createElement("div",{className:"col-xl-12 col-md-12 mb-4 text-center"},a.createElement("div",{className:"mb-4"},'Click "Start" to begin the Flashcard exercise'),a.createElement(p,{theme:"secondary",icon:"fas fa-play",on_click:function(){return e.next()}},"Start")))));else{var r=void 0,o=void 0,s=void 0;this.state.hide_native||(r=a.createElement(k,{read_only:!0,on_resolve_keys:this.props.on_resolve_keys,on_add:function(){},on_delete:function(){},on_word_select:this.props.on_word_select,data:this.state.word.get_natives()})),this.state.hide_pronunciation||(o=a.createElement(g,{read_only:!0,on_add:function(){},on_delete:function(){},data:this.state.word.get_pronunciations()})),this.state.hide_example||(s=a.createElement(E,{read_only:!0,on_add:function(){},on_delete:function(){},on_example_update:function(){},data:this.state.word.get_examples()})),n=a.createElement(a.Fragment,null,a.createElement(m,null,a.createElement("i",{className:"far fa-file-word"})," ",a.createElement("b",null,this.state.word.get_word())),a.createElement("div",{className:"row"},a.createElement("div",{className:"col-lg-12 mb-4"},a.createElement(p,{theme:"info",icon:"fas fa-eye",extra_class:0===this.state.word.get_natives().length?"disabled":"",on_click:function(){return e.show_native()}},"Show Native Form"))),r,a.createElement("div",{className:"row"},a.createElement("div",{className:"col-lg-12 mb-4"},a.createElement(p,{theme:"success",icon:"fas fa-eye",extra_class:0===this.state.word.get_pronunciations().length?"disabled":"",on_click:function(){return e.show_pronunciation()}},"Show Pronunciation"))),o,a.createElement("div",{className:"row"},a.createElement("div",{className:"col-lg-12 mb-4"},a.createElement(p,{theme:"primary",icon:"fas fa-eye",extra_class:0===this.state.word.get_examples().length?"disabled":"",on_click:function(){return e.show_example()}},"Show Example"))),s)}return a.createElement("div",{className:"m-2"},a.createElement(m,null,a.createElement("i",{className:"far afa-file-word"})," ",a.createElement("b",null,"Flashcard")),a.createElement("div",{className:"row"},a.createElement("div",{className:"col-md-4 mb-4"},a.createElement(p,{theme:"secondary",icon:"fas fa-arrow-left",extra_class:t,on_click:function(){return e.previous()}},"Previous")),a.createElement("div",{className:"col-md-4 mb-4 text-center"},this.index>=0?this.index+1+" / "+this.props.words_keys.length:"Total words: "+this.props.words_keys.length),a.createElement("div",{className:"col-md-4 mb-4 text-right"},a.createElement(p,{theme:"secondary",icon:"fas fa-arrow-right",extra_class:t,on_click:function(){return e.next()}},"Next"))),n)}}]),t}(a.Component),C=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){if(this.props.hidden)return a.createElement(a.Fragment,null);var e=a.createElement(a.Fragment,null);return this.props.button.length>0&&(e=a.createElement("button",{className:"btn btn-primary btn-sm float-right ml-2",onClick:this.props.on_button_click},this.props.button)),a.createElement("div",{className:"m-2"},a.createElement("div",{className:"alert alert-"+this.props.theme+" alert-dismissible fade show",role:"alert"},this.props.text,e,a.createElement("button",{type:"button",className:"close","aria-label":"Close",onClick:this.props.on_close},a.createElement("span",null,"\xd7"))))}}]),t}(a.Component),S=n(14);function A(e){return S(e)}var F=function(){function e(t){Object(i.a)(this,e),this.word=t,this.pronunciations=[],this.examples=[],this.natives=[]}return Object(c.a)(e,[{key:"add_pronunciation",value:function(e,t){this.pronunciations.push(new b(e,t))}},{key:"delete_pronunciation",value:function(e){this.pronunciations.splice(e,1)}},{key:"get_pronunciations",value:function(){return this.pronunciations}},{key:"add_example",value:function(e){this.examples.push(e)}},{key:"delete_example",value:function(e){this.examples.splice(e,1)}},{key:"get_examples",value:function(){return this.examples}},{key:"get_word",value:function(){return this.word}},{key:"set_word",value:function(e){this.word=e}},{key:"get_md5",value:function(){return A(this.get_word())}},{key:"add_native",value:function(e){this.natives.push(e)}},{key:"delete_native",value:function(e){this.natives.splice(e,1)}},{key:"get_natives",value:function(){return this.natives}},{key:"to_json",value:function(){var e={};return e.word=this.word,e.native_form=[],this.natives.forEach((function(t){e.native_form.push(t)})),e.example=[],this.examples.forEach((function(t){e.example.push(t.to_json())})),e.pronunciation=[],this.pronunciations.forEach((function(t){e.pronunciation.push(t.to_json())})),e}},{key:"clone",value:function(){return e.from_json(this.to_json())}}],[{key:"from_json",value:function(t){var n=new e(t.word);return t.native_form.forEach((function(e){n.add_native(e)})),t.pronunciation.forEach((function(e){n.add_pronunciation(e.language,e.sound)})),t.example.forEach((function(e){var t=new x(e.sentence);e.pronunciation.forEach((function(e){t.add_sound(e.language,e.sound)})),n.add_example(t)})),n}}]),e}(),D=function(){function e(){Object(i.a)(this,e),this.words=new Map}return Object(c.a)(e,[{key:"get_words",value:function(){return this.words}},{key:"get_word",value:function(e){return this.get_word_by_key(A(e))}},{key:"get_word_by_key",value:function(e){return this.words.has(e)?this.words.get(e):null}},{key:"add_word",value:function(e){this.words.set(e.get_md5(),e)}},{key:"init_data",value:function(){this.add_word(F.from_json({word:"Tea",native_form:["\u8336"],example:[],pronunciation:[{language:"English",sound:"Chai"}]}))}}]),e}(),W=function(){function e(t,n){Object(i.a)(this,e),this.url=t,this.port=n,this.static_data=void 0,this.last_connected_check=!1,this.static_data=new D,this.static_data.init_data()}return Object(c.a)(e,[{key:"valid_url",value:function(){return null!==this.url&&null!==this.port}},{key:"make_url",value:function(){for(var e=this.url+":"+this.port,t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];return n.forEach((function(t){e+="/"+encodeURI(t)})),e}},{key:"get_url",value:function(){return this.url}},{key:"get_port",value:function(){return this.port}},{key:"get_words",value:function(){return this.static_data.get_words()}},{key:"get_word",value:function(e){return this.static_data.get_word(e)}},{key:"get_word_by_key",value:function(e){return this.static_data.get_word_by_key(e)}},{key:"was_ok",value:function(){return this.last_connected_check}},{key:"to_string",value:function(){return"URL: "+this.get_url()+" PORT: "+this.get_port()}},{key:"is_ok",value:function(e){var t=this;if(!this.valid_url())return this.last_connected_check=!1,void e();fetch(this.make_url("ok"),{mode:"cors"}).then((function(e){return e.json()})).then((function(n){t.last_connected_check=n.success||!1,e()})).catch((function(){t.last_connected_check=!1,e()}))}},{key:"remove_word",value:function(e,t){this.valid_url()?fetch(this.make_url("word","remove",e),{mode:"cors"}).then((function(e){return e.json()})).then((function(e){t(e.success)})).catch((function(){t(!1)})):t(!1)}},{key:"set_word",value:function(e,t){var n=this;this.valid_url()?fetch(this.make_url("word","set"),{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({word:e.get_word(),json_data:JSON.stringify(e.to_json())})}).then((function(e){return e.json()})).then((function(a){var r=a.success||!1;r&&n.static_data.add_word(e),t(r)})).catch((function(){t(!1)})):t(!1)}}]),e}(),L=new W(null,null);function P(e){ee({theme:"danger",hidden:!1,text:e})}function T(e){ee({theme:"success",hidden:!1,text:e})}function B(){ee({hidden:!0})}function I(e){L.set_word(e,(function(t){t?(Z(),Y(e.get_word()),T("Word '"+e.get_word()+"' was saved successfully")):P("Failed to save '"+e.get_word()+"'")}))}function U(e){L.remove_word(e.get_word(),(function(t){t?(Q(),T("Word '"+e.get_word()+"' was deleted successfully")):P("Failed to delete '"+e.get_word()+"'")}))}function q(e){I(new F(e))}function M(e){Y(e)}function R(e){!function(e,t){ee({theme:"warning",hidden:!1,text:t,button:"Save",on_button_click:function(){I(e)}})}(e,"Click 'Save' after done editing, or 'Undo' to abort the changes")}function J(e){ee({theme:"warning",hidden:!1,text:"Changes for '"+e.get_word()+"' were discarded"})}function V(){!function(){var e=Array.from(L.get_words().keys());(function(e){for(var t=e.length,n=void 0,a=void 0;0!==t;)a=Math.floor(Math.random()*t),n=e[t-=1],e[t]=e[a],e[a]=n})(e),s.a.render(r.a.createElement(O,{words_keys:e,on_word_select:H,on_resolve_keys:G,on_show_word:X}),document.getElementById("page-content"))}()}function z(e,t){!function(e,t){(L=new W(e,t)).is_ok((function(){L.was_ok()?T("Successfully connected to server "+L.to_string()):P("Failed to connect to server "+L.to_string()),Q()}))}(e,t)}function X(e,t){var n=L.get_word_by_key(e);null!==n?t(n):P("Failed to load flashcard word")}function $(e){I(e)}function G(e){var t=new Map;return e.forEach((function(e){var n=L.get_word_by_key(e);null!==n&&t.set(e,n.get_word())})),t}function H(e){ee({theme:"warning",hidden:!1,text:"Click on 'Visit Word' to exist flashcard exercise and show word '"+e+"' in regular mode",button:"Visit Word",on_button_click:function(){Y(e)}})}function K(){s.a.render(r.a.createElement(f,null),document.getElementById("page-content"))}function Q(){s.a.render(r.a.createElement("a",{className:"sidebar-brand d-flex align-items-center justify-content-center",href:"#/",onClick:function(){return K()}},r.a.createElement("div",{className:"sidebar-brand-icon rotate-n-15"},r.a.createElement("i",{className:"fas fa-language"})),r.a.createElement("div",{className:"sidebar-brand-text mx-3"},"Learn A Language")),document.getElementById("logo")),Z(),K()}function Y(e){var t=L.get_word(e);null!==t?s.a.render(r.a.createElement(N,{key:t.get_word(),word:t,read_only:!L.was_ok(),on_resolve_keys:G,on_copy_word:$,on_word_select:M,on_edit:R,on_undo:J,on_delete:U}),document.getElementById("page-content")):P("Failed to load word '"+e+"'")}function Z(){var e=L.get_words();s.a.render(r.a.createElement(j,{read_only:!L.was_ok(),words:Array.from(e.values()),on_word_select:M,on_flashcard:V,on_server_update:z,on_new_word:q}),document.getElementById("search-panel"))}function ee(e){(e=e||{}).theme=e.theme||"warning",e.text=e.text||"",e.hidden=e.hidden||!1,e.button=e.button||"",e.on_button_click=e.on_button_click||function(){},s.a.render(r.a.createElement(C,{hidden:e.hidden,theme:e.theme,text:e.text,button:e.button,on_button_click:e.on_button_click,on_close:B}),document.getElementById("notification"))}Q(),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},9:function(e,t,n){e.exports=n(17)}},[[9,1,2]]]);
//# sourceMappingURL=main.1b47bec4.chunk.js.map